import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../app.graphQlService';
import { GET_USERS } from '../app.query';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
    selector: 'app-create-group-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-group-modal.html',
    styleUrls: ['./create-group-modal.css']
})
export class CreateGroupModal implements OnInit {
    @Output() onClose = new EventEmitter<void>();
    @Output() onGroupCreated = new EventEmitter<void>();

    groupName: string = '';
    users: any[] = [];
    selectedUserIds: Set<number> = new Set();
    loading: boolean = false;

    constructor(private userDataService: UserDataService) { }

    ngOnInit() {
        console.log("Going to fetch the list of all users..")
        this.userDataService.getUsers(GET_USERS).subscribe({
            next: (users) => this.users = users,
            error: (err) => console.error('Failed to load users', err)
        });
        console.log("The following are  the list of users.", this.users)
    }

    toggleUser(userId: number) {
        if (this.selectedUserIds.has(userId)) {
            this.selectedUserIds.delete(userId);
        } else {
            this.selectedUserIds.add(userId);
        }
    }

    async createGroup() {
        if (!this.groupName.trim()) return;

        this.loading = true;
        try {
            const response = await fetch('/groupData/groups/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group_name: this.groupName,
                    user_ids: Array.from(new Set([...this.selectedUserIds, 2])) // Hardcoded current user ID 2
                }),
            });

            if (response.ok) {
                this.onGroupCreated.emit();
                this.close();
                window.location.reload();
            } else {
                console.error('Failed to create group');
            }
        } catch (e) {
            console.error('Error creating group', e);
        } finally {
            this.loading = false;
        }
    }

    close() {
        this.onClose.emit();
    }
}
