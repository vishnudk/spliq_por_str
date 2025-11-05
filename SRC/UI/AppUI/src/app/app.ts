import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseComp } from './base-comp/base-comp';
import { LoginPage } from './login-page/login-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaseComp, LoginPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AppUI');
}
