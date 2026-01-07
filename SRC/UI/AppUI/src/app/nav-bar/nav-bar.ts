import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar {
  @Output() onCreateGroup = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();
  isCollapsed = false;

  constructor(
    private router: Router,
  ) { }

  createGroup() {
    this.onCreateGroup.emit();
  }

  logout() {
    this.onLogout.emit();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  goToHomePage() {
    this.router.navigate(['home']);
  }
}
