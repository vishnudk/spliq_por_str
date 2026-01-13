import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { HomePageHeader } from '../home-page-header/home-page-header';
import { UserDataServiceById } from '../app.graphQlService';
import { GET_USER_NAME_WITH_USER_ID } from '../app.query';

@Component({
    selector: 'app-settle-expense-page',
    standalone: true,
    imports: [CommonModule, NavBar, HomePageHeader],
    templateUrl: './settle-expense-page.html',
    styleUrl: './settle-expense-page.css',
})
export class SettleExpensePage implements OnInit {
    txId: string | null = null;
    transaction: any = null;
    participations: any[] = [];
    userName: string = "";
    currentUserID: string = "";
    payerName: string = "Loading...";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userDataService: UserDataServiceById
    ) { }

    ngOnInit() {
        this.txId = this.route.snapshot.paramMap.get('txId');
        this.userName = this.getUserNameFromCookie() || "";
        this.currentUserID = this.getUserIDFromCookie() || "";
        if (this.txId) {
            this.fetchTransactionDetails();
            this.fetchParticipations();
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

    fetchTransactionDetails() {
        fetch(`/expenseMgr/expenseData/transactions/${this.txId}/`)
            .then(res => res.json())
            .then(data => {
                this.transaction = data;
                this.resolveUserName(data.paid_by, (name) => this.payerName = name);
            });
    }

    fetchParticipations() {
        fetch(`/expenseMgr/expenseData/transactions/${this.txId}/participations/`)
            .then(res => res.json())
            .then(data => {
                this.participations = data;
                this.participations.forEach(part => {
                    part.participant_name = `User ${part.participant_id}`;
                    this.resolveUserName(part.participant_id, (name) => part.participant_name = name);
                });
            });
    }

    resolveUserName(userId: number, callback: (name: string) => void) {
        this.userDataService.getUsersById(GET_USER_NAME_WITH_USER_ID, userId)
            .subscribe(user => {
                if (user && user.username) {
                    callback(user.username);
                }
            });
    }

    settleDebt(part: any) {
        if (!confirm(`Mark debt for ${part.participant_name} as PAID?`)) return;

        fetch(`/expenseMgr/expenseData/participations/${part.id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...part, status: 'paid' })
        })
            .then(res => res.json())
            .then(updatedPart => {
                part.status = 'paid';
            })
            .catch(err => console.error("Error updating participation", err));
    }
}
