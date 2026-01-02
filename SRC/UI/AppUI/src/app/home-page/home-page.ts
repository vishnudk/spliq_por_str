import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageHeader } from '../home-page-header/home-page-header';
import { HomePageBody } from '../home-page-body/home-page-body';
import { NavBar } from '../nav-bar/nav-bar';
import { CreateGroupModal } from '../create-group-modal/create-group-modal';

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
}
