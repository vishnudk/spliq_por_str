import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NavBar } from '../nav-bar/nav-bar';
import { HomePageHeader } from '../home-page-header/home-page-header';
import { UserDataServiceById } from '../app.graphQlService';
import { GET_USER_NAME_WITH_USER_ID } from '../app.query';

class GroupMemberData {
  public id: number;
  public username: string;
  public selected: boolean;
  constructor(id: number, username: string, selected: boolean) {
    this.id = id;
    this.username = username;
    this.selected = selected;
  }
}

@Component({
  selector: 'app-add-expense-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavBar, HomePageHeader],
  templateUrl: './add-expense-page.html',
  styleUrls: ['./add-expense-page.css']
})
export class AddExpensePage implements OnInit {
  amount: number | null = null;
  description: string = '';
  members: any[] = [];
  groupId: string | null = null;
  currentUserId: number | null = null;
  userName: string = '';
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private userDataGrphQlSerive: UserDataServiceById
  ) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.getCurrentUser();
    this.userName = this.getCookie('username') || '';
    if (this.groupId) {
      this.fetchGroupUsers();
    }
    console.log("Going to print member details of the group!");
    console.log(this.members);
    for (let member of this.members) {
      console.log(member);
    }
  }
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  getUserNameFromUserId(userId: number) {
    this.userDataGrphQlSerive.getUsersById(GET_USER_NAME_WITH_USER_ID, userId)
      .subscribe((data) => {
        console.log(data);
        for (let i = 0; i < this.members.length; i++) {
          if (this.members[i].id == userId) {
            this.members[i].username = data.username;
            break;
          }
        }
      });
  }
  getCurrentUser() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('userid=')) {
        this.currentUserId = parseInt(cookie.substring('userid='.length), 10);
        break;
      }
    }
  }

  fetchGroupUsers() {
    fetch(`/groupMgr/groupData/group/${this.groupId}/users/`)
      .then(response => response.json())
      .then(data => {
        console.log("Going to print member details of the group!");
        console.log(data);
        // Assume data is a list of users or object with users
        // Mapping to add 'selected' property
        if (Array.isArray(data)) {

          this.members = data.map(user => {
            this.getUserNameFromUserId(user["user_id"]);
            return new GroupMemberData(parseInt(user["user_id"]),
              "", // for now this will be empty but this will be filled from a function call from html
              true);
          });
        }
        console.log(this.members);
      })
      .catch(error => console.error('Error fetching group users:', error));
  }

  goBack() {
    this.location.back();
  }

  saveExpense() {
    if (!this.amount || !this.description || !this.groupId || !this.currentUserId) {
      alert('Please fill all fields');
      return;
    }

    const selectedMembers = this.members.filter(m => m.selected);
    if (selectedMembers.length === 0) {
      alert('Please select at least one person to split with');
      return;
    }

    const splitAmount = this.amount / selectedMembers.length;

    // Construct participations
    // We assume backend handles the math or we send exact amounts. 
    // Usually standard is to send who owes what.
    const participations = selectedMembers.map(m => ({
      participant_id: m.id, // Assuming user object has 'id'
      owed_amount: splitAmount,
      status: 'unpaid'
    }));

    const payload = {
      amount: this.amount,
      paid_by: this.currentUserId,
      group_id: parseInt(this.groupId, 10),
      description: this.description,
      participations: participations
    };

    fetch('/expenseMgr/expenseData/transactions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(data => {
        console.log('Expense saved', data);
        this.router.navigate(['group', this.groupId]);
      })
      .catch(error => {
        console.error('Error saving expense:', error);
        alert('Failed to save expense');
      });
  }
}
