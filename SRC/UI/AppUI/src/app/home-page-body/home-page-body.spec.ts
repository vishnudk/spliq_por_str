import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBody } from './home-page-body';

describe('HomePageBody', () => {
  let component: HomePageBody;
  let fixture: ComponentFixture<HomePageBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
