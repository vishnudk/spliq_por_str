import { Component, INJECTOR, Input } from '@angular/core';
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

  constructor(private userDataService: UserDataServiceById) {
    userDataService.getUsersById(GET_USER_EXPENSE_AND_INCOME_WITH_ID, 1).subscribe(user => {

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

}
