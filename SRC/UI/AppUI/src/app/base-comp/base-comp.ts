import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-base-comp',
  imports: [MatSlideToggleModule, MatCardModule],
  templateUrl: './base-comp.html',
  styleUrl: './base-comp.css',
})
export class BaseComp {

}
