import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavService } from '../nav.service';

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
  @Input() userName = "";

  constructor(private navService: NavService) { }

  toggleCollapse() {
    this.navService.toggle();
  }

}
