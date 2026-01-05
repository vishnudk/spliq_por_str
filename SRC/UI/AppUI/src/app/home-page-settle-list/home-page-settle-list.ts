import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { HomePageSettleItem } from '../home-page-settle-item/home-page-settle-item';
import { UserDataServiceById } from '../app.graphQlService';
import { GET_USER_CONVERSATIONS } from '../app.query';
@Component({
  selector: 'app-home-page-settle-list',
    standalone: true,
  imports: [HomePageSettleItem],
  templateUrl: './home-page-settle-list.html',
  styleUrl: './home-page-settle-list.css',
})
export class HomePageSettleList {

   @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
    ngAfterViewInit() {
        this.addConversations();
        window.addEventListener('groups:changed', this.onGroupsChanged);
    }

    ngOnDestroy() {
        window.removeEventListener('groups:changed', this.onGroupsChanged);
    }

    private onGroupsChanged = () => {
        this.addConversations();
    };

    constructor(private userDataService: UserDataServiceById) {
    }

  addConversations() {
    this.container.clear(); // clear previous components
    
    const userId = this.getCookie('userid');
    if (!userId) {
        console.error('User ID not found in cookies');
        // Handle case where user is not logged in if necessary, maybe redirect
        return;
    }

    this.userDataService.getUsersById(GET_USER_CONVERSATIONS, parseInt(userId)).subscribe(user => {
        console.log('Fetched user conversations :', user);
        user.conversationType.forEach((conversation: any) => {
            const compRef = this.container.createComponent(HomePageSettleItem);
            compRef.instance.conversationName = conversation.conversationName;
            compRef.instance.conversationId = conversation.conversationId;
        })});
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}

// constructor(private userDataService: UserDataServiceById) {
//     userDataService.getUsersById(GET_USER_EXPENSE_AND_INCOME_WITH_ID,2).subscribe(user => {
//       console.log('Fetched users with expenses:', user);
//       this.youGet = user.expenseType.at(0).totalAmountToGet || 0;
//       this.youOwe = user.expenseType.at(0).totalAmountToBePaid || 0;
//     });
     
//   }