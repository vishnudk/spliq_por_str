import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signin-page',
    imports: [MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        RouterModule,
        CommonModule
    ],
    templateUrl: './signin-page.html',
    styleUrl: './signin-page.css',
    standalone: true
})
export class SigninPage {
    constructor(private router: Router) { }
    username: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    usernameError: string = '';
    passwordError: string = '';

    checkUsername() {
        if (!this.username) return;

        const formData = new FormData();
        formData.append('username', this.username);

        fetch('http://localhost/userMgrAuth/checkUsername/', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'exists') {
                    this.usernameError = 'Username is already taken.';
                    this.username = ''; // Clear the input
                } else {
                    this.usernameError = '';
                }
            })
            .catch(error => console.error('Error checking username:', error));
    }

    onSignup() {
        this.passwordError = '';

        if (this.password !== this.confirmPassword) {
            this.passwordError = 'Passwords do not match.';
            return;
        }

        if (!this.username || !this.email || !this.password) {
            // Basic empty check needed
            this.passwordError = 'Please fill all fields.';
            return;
        }

        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('password', this.password);
        formData.append('email', this.email);

        fetch('http://localhost/userMgrAuth/createUser/', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    // Handle successful signup
                    console.log('Signup successful!');
                    this.router.navigate(['login']);
                } else {
                    // Handle failure
                    console.log('Signup failed:', data.message);
                    this.passwordError = 'Signup failed: ' + data.message;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                this.passwordError = 'An error occurred during signup.';
            });
    }
}
