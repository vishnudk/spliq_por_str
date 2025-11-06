import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageInfoPanel } from './home-page-info-panel';

describe('HomePageInfoPanel', () => {
  let component: HomePageInfoPanel;
  let fixture: ComponentFixture<HomePageInfoPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageInfoPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageInfoPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
