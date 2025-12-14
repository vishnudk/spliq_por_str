import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home-page-settle-item',
    standalone: true,
  imports: [MatCardModule],
  templateUrl: './home-page-settle-item.html',
  styleUrl: './home-page-settle-item.css',
})
export class HomePageSettleItem {
 @Input() conversationName!: string;
  @Input() conversationId!: number;

  onSelect() {
    console.log(`Selected group: ${this.conversationName}`);
  }
}
