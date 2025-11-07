import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { HomePageSettleItem } from '../home-page-settle-item/home-page-settle-item';

@Component({
  selector: 'app-home-page-settle-list',
    standalone: true,
  imports: [HomePageSettleItem],
  templateUrl: './home-page-settle-list.html',
  styleUrl: './home-page-settle-list.css',
})
export class HomePageSettleList {

   @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
ngAfterViewInit() {
    this.addComponents();
  }
groupList = [
    {
        groupName: 'Trip to Paris',
        totalAmount: 1200,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    {
        groupName: 'Weekend Getaway',
        totalAmount: 600,
        currency: 'USD'
    },
    
];

addComponents() {
    this.container.clear(); // clear previous components
    this.groupList.forEach(data => {
      const compRef = this.container.createComponent(HomePageSettleItem);
      compRef.instance.groupName = data.groupName;
      compRef.instance.totalAmount = data.totalAmount;
      compRef.instance.currency = data.currency;
    });
  }
}
