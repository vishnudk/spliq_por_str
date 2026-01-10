import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../nav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar implements OnInit, OnDestroy {
  @Output() onCreateGroup = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();
  isCollapsed = false;
  private sub = new Subscription();

  constructor(
    private router: Router,
    private navService: NavService
  ) { }

  ngOnInit() {
    this.sub.add(this.navService.toggle$.subscribe(() => {
      this.toggleCollapse();
    }));
    this.isCollapsed = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

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
