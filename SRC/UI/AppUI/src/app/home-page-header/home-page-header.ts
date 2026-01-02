import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-home-page-header',
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenu,
    MatMenuModule,
    MatSidenavModule
  ],
  templateUrl: './home-page-header.html',
  styleUrl: './home-page-header.css',
})
export class HomePageHeader {

  showFiller = false;

  // async onAddGroup() {
  //   const groupName = window.prompt('Enter group name');
  //   if (!groupName) {
  //     return;
  //   }

  //   const response = await fetch('/groupData/groups/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ group_name: groupName }),
  //   });

  //   if (!response.ok) {
  //     const errorText = await response.text();
  //     console.error('Failed to create group:', errorText);
  //     return;
  //   }

  //   const createdGroup = await response.json();
  //   console.log('Created group:', createdGroup);
  //   window.dispatchEvent(new CustomEvent('groups:changed'));
  // }
}
