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

}
