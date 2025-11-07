import { Component } from '@angular/core';
import { HomePageInfoPanel } from '../home-page-info-panel/home-page-info-panel';
import { HomePageSettleList } from '../home-page-settle-list/home-page-settle-list';
import { HomePageSettleItem } from '../home-page-settle-item/home-page-settle-item';
@Component({
  selector: 'app-home-page-body',
  imports: [HomePageInfoPanel,
    HomePageSettleList,
    HomePageSettleItem
  ],
  templateUrl: './home-page-body.html',
  styleUrl: './home-page-body.css',
})
export class HomePageBody {

}
