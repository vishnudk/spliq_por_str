import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComp } from './base-comp';

describe('BaseComp', () => {
  let component: BaseComp;
  let fixture: ComponentFixture<BaseComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
