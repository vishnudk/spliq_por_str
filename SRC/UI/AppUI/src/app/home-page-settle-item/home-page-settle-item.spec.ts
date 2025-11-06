import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSettleItem } from './home-page-settle-item';

describe('HomePageSettleItem', () => {
  let component: HomePageSettleItem;
  let fixture: ComponentFixture<HomePageSettleItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageSettleItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageSettleItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
