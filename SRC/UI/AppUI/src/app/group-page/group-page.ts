import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { HomePageHeader } from '../home-page-header/home-page-header';
import { UserDataServiceById } from '../app.graphQlService';
import { GET_USER_NAME_WITH_USER_ID } from '../app.query';


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
  currentUserID: string = "";
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userDataGrphQlSerive: UserDataServiceById) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    if (this.groupId) {
      this.fetchTransactions();
      this.fetchGroupDetails();
      this.userName = this.getUserNameFromCookie() || "";
      this.currentUserID = this.getUserIDFromCookie() || "";
    }
  }
  private getUserIDFromCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; userid=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  private getUserNameFromCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; username=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  fetchTransactions() {
    console.log(this.groupId);
    fetch(`/expenseMgr/expenseData/transactions/group/${this.groupId}/`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.transactions = data;
        for (let i = 0; i < this.transactions.length; i++) {
          if (this.transactions[i].paid_by == this.currentUserID) {
            this.transactions[i].paid_by = this.userName;
            this.transactions[i].paid_by_color = "green";
          }
          else {
            this.updateUserIdWithUserName(this.transactions[i].paid_by);
            this.transactions[i].paid_by_color = "red";
          }
        }
        // Sort by date desc
        this.transactions.sort((a: any, b: any) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }
  updateUserIdWithUserName(userId: number) {
    this.userDataGrphQlSerive.getUsersById(GET_USER_NAME_WITH_USER_ID, userId)
      .subscribe((data) => {
        console.log(data);
        for (let i = 0; i < this.transactions.length; i++) {
          if (this.transactions[i].paid_by == userId) {
            console.log("Found user name for user id: " + userId + " and name: " + data);
            this.transactions[i].paid_by = data.username;
            break;
          }
        }
      });
  }
  fetchGroupDetails() {
    // Fetch group name if possible. For now, we can just use the ID or fetch from groupData
    fetch(`/groupMgr/groupData/groups/${this.groupId}/`)
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

  goToSettleExpense(txId: number) {
    this.router.navigate(['/settle-expense', txId]);
  }
}
