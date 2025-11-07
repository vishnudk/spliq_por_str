import { Component, INJECTOR, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-home-page-info-panel',
  imports: [MatCardModule],
  templateUrl: './home-page-info-panel.html',
  styleUrl: './home-page-info-panel.css',
})
export class HomePageInfoPanel {
@Input () youGet!: number;
@Input () youOwe!: number;
constructor() {
    this.youGet = 8250;
    this.youOwe = 1280;  
  }

}
