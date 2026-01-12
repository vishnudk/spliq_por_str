import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { HomePageHeader } from '../home-page-header/home-page-header';
import { UserDataServiceById } from '../app.graphQlService';
import { GET_USER_NAME_WITH_USER_ID } from '../app.query';

@Component({
    selector: 'app-debt-details-page',
    standalone: true,
    imports: [CommonModule, NavBar, HomePageHeader],
    templateUrl: './debt-details-page.html',
    styleUrl: './debt-details-page.css',
})
export class DebtDetailsPage implements OnInit {
    userName: string = "";
    currentUserID: string = "";
    debtType: string | null = null;
    debtList: any[] = [];
    pageTitle: string = "";
    amountColor: string = "black";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userDataService: UserDataServiceById
    ) { }

    ngOnInit() {
        this.userName = this.getUserNameFromCookie() || "";
        this.currentUserID = this.getUserIDFromCookie() || "";

        this.route.paramMap.subscribe(params => {
            this.debtType = params.get('type');
            this.updatePageTitle();
            if (this.currentUserID) {
                this.fetchDebtDetails();
            }
        });
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

    updatePageTitle() {
        if (this.debtType === 'owe') {
            this.pageTitle = "You Owe";
            this.amountColor = "red";
        } else if (this.debtType === 'get') {
            this.pageTitle = "People Owe You";
            this.amountColor = "green";
        } else {
            this.pageTitle = "Debt Details";
        }
    }

    fetchDebtDetails() {
        fetch(`/expenseMgr/expenseData/user/${this.currentUserID}/details/`)
            .then(response => response.json())
            .then(data => {
                // Filter based on type
                if (this.debtType === 'owe') {
                    this.debtList = data.filter((item: any) => item.type === 'YOU_OWE');
                } else if (this.debtType === 'get') {
                    this.debtList = data.filter((item: any) => item.type === 'OWE_YOU');
                } else {
                    this.debtList = [];
                }

                // Resolve names
                this.debtList.forEach((item, index) => {
                    this.userDataService.getUsersById(GET_USER_NAME_WITH_USER_ID, item.person_id)
                        .subscribe((userData) => {
                            item.person_name = userData.username;
                        });
                    // Fallback if name loading takes time
                    item.person_name = `User ${item.person_id}`;
                });

                // Sort by date (optional)
                this.debtList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            })
            .catch(error => console.error('Error fetching debt details:', error));
    }
}
