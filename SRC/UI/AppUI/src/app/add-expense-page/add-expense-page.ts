import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NavBar } from '../nav-bar/nav-bar';
import { HomePageHeader } from '../home-page-header/home-page-header';

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

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.getCurrentUser();
    if (this.groupId) {
      this.fetchGroupUsers();
    }
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
    fetch(`/groupData/group/${this.groupId}/users/`)
      .then(response => response.json())
      .then(data => {
        // Assume data is a list of users or object with users
        // Mapping to add 'selected' property
        if (Array.isArray(data)) {
          this.members = data.map(user => ({ ...user, selected: true })); // Default select all
        } else if (data.users) {
          this.members = data.users.map((user: any) => ({ ...user, selected: true }));
        }
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

    fetch('http://localhost/expenseData/transactions/', {
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
