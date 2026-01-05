import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar {
  @Output() onCreateGroup = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();
  isCollapsed = false;

  createGroup() {
    this.onCreateGroup.emit();
  }

  logout() {
    this.onLogout.emit();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
