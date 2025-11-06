import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-splash-screen',
  imports: [MatButtonModule,
    MatInputModule
  ],
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.css',
})
export class SplashScreen {
constructor(private router: Router) {}
  onContinue() {
    console.log('Continue button clicked');
    this.router.navigate(['login']);
  }
  sayHello() {
    console.log('Hello, Luca!');
    alert('Hello, Luca!');
  }
}
