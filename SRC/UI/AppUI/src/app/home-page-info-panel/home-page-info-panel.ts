import { Component, INJECTOR, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UserDataServiceById } from '../app.graphQlService';
import { GET_USER_EXPENSE_AND_INCOME_WITH_ID } from '../app.query';
@Component({
  selector: 'app-home-page-info-panel',
  imports: [MatCardModule],
  templateUrl: './home-page-info-panel.html',
  styleUrl: './home-page-info-panel.css',
})
export class HomePageInfoPanel {
  @Input() youGet!: number;
  @Input() youOwe!: number;
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  constructor(private userDataService: UserDataServiceById, private router: Router) {
    const userId = this.getCookie('userid');
    if (!userId) {
      console.error('User ID not found in cookies');
      // Handle case where user is not logged in if necessary, maybe redirect
      return;
    }
    const userIdInt = parseInt(userId)
    userDataService.getUsersById(GET_USER_EXPENSE_AND_INCOME_WITH_ID, userIdInt).subscribe(user => {

      console.log('Fetched users with expenses:', user);
      if (user) {
        this.youGet = user.expenseType.at(0).totalAmountToGet || 0;
        this.youOwe = user.expenseType.at(0).totalAmountToBePaid || 0;
      }
      else {
        this.youGet = 0;
        this.youOwe = 0;
      }


    });

  }

  onGetClick() {
    this.router.navigate(['/debt-details', 'get']);
  }

  onOweClick() {
    this.router.navigate(['/debt-details', 'owe']);
  }

}
