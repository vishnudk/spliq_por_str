import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSettleList } from './home-page-settle-list';

describe('HomePageSettleList', () => {
  let component: HomePageSettleList;
  let fixture: ComponentFixture<HomePageSettleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageSettleList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageSettleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
