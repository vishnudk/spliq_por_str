import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageHeader } from '../home-page-header/home-page-header';
import { HomePageBody } from '../home-page-body/home-page-body';
import { NavBar } from '../nav-bar/nav-bar';
import { CreateGroupModal } from '../create-group-modal/create-group-modal';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [HomePageHeader,
    CommonModule,
    HomePageBody,
    NavBar,
    CreateGroupModal
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  isModalOpen = false;

  constructor(private router: Router) { }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onGroupCreated() {
    // Optionally trigger a refresh on the home page body if needed, 
    // but for now just closing the modal. 
    // Ideally we might want to share state or trigger a reload event.
    window.dispatchEvent(new Event('groups:changed'));
    this.closeModal();
  }

  onLogout() {
    // Clear cookies
    document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Navigate to login
    this.router.navigate(['login']);
  }
}
