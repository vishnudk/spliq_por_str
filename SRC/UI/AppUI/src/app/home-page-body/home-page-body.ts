import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { HomePageInfoPanel } from '../home-page-info-panel/home-page-info-panel';
import { HomePageSettleList } from '../home-page-settle-list/home-page-settle-list';
import { HomePageSettleItem } from '../home-page-settle-item/home-page-settle-item';
@Component({
  selector: 'app-home-page-body',
  imports: [CommonModule,
    HomePageInfoPanel,
    HomePageSettleList,
    HomePageSettleItem
  ],
  templateUrl: './home-page-body.html',
  styleUrl: './home-page-body.css',
})
export class HomePageBody {

  @ViewChild(HomePageSettleList) settleList!: HomePageSettleList;

  groups: Array<{ id: number; group_name: string; created_at: string }> = [];

  private onGroupsChanged = () => {
    this.loadGroups();
  };

  ngOnInit() {
    this.loadGroups();
    window.addEventListener('groups:changed', this.onGroupsChanged);
  }

  ngOnDestroy() {
    window.removeEventListener('groups:changed', this.onGroupsChanged);
  }

  async loadGroups() {
    if (this.settleList) {
      this.settleList.addConversations();
    }
  }
}
