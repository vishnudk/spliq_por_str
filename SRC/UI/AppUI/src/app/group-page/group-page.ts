import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { HomePageHeader } from '../home-page-header/home-page-header';

@Component({
  selector: 'app-group-page',
  standalone: true,
  imports: [CommonModule, NavBar, HomePageHeader],
  templateUrl: './group-page.html',
  styleUrl: './group-page.css',
})
export class GroupPage {
  groupId: string | null = null;
  transactions: any[] = [];
  groupName: string = 'Group';
  userName: string = "";
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    if (this.groupId) {
      this.fetchTransactions();
      this.fetchGroupDetails();
      this.userName = this.getUserNameFromCookie() || "";
    }
  }
  private getUserNameFromCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; username=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  fetchTransactions() {
    console.log(this.groupId);
    fetch(`http://localhost/expenseData/transactions/group/${this.groupId}/`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.transactions = data;
        // Sort by date desc
        this.transactions.sort((a: any, b: any) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }

  fetchGroupDetails() {
    // Fetch group name if possible. For now, we can just use the ID or fetch from groupData
    fetch(`/groupData/groups/${this.groupId}/`)
      .then(response => response.json())
      .then(data => {
        if (data && data.group_name) {
          this.groupName = data.group_name;
        }
      })
      .catch(err => console.error(err));
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  goToAddTransaction() {
    this.router.navigate(['group', this.groupId, 'add-transaction']);
  }
}
