import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import {HomePage} from '../home-page/home-page';
@Component({
  selector: 'app-login-page',
  imports: [MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    HomePage
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  standalone: true
})
export class LoginPage {
  constructor(private router: Router) {}
  username: string = '';
  password: string = '';

  onLogin() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    fetch('http://localhost/userMgrAuth/authenticate/', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if(data.status === 'success'){
        // Handle successful login
        console.log('Login successful!');
        this.router.navigate(['home']);
      } else {
        // Handle login failure
        console.log('Login failed:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}
