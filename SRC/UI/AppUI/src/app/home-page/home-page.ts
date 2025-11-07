import { Component } from '@angular/core';
import { HomePageHeader } from '../home-page-header/home-page-header';
import { HomePageBody } from '../home-page-body/home-page-body';
@Component({
  selector: 'app-home-page',
  imports: [HomePageHeader,
    HomePageBody
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
