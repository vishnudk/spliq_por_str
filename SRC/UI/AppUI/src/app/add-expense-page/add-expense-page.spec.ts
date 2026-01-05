import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { AddExpensePage } from './add-expense-page';

describe('AddExpensePage', () => {
  let component: AddExpensePage;
  let fixture: ComponentFixture<AddExpensePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpensePage, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123'
              }
            }
          }
        }
      ]
    })
      .compileComponents();

    spyOn(window, 'fetch').and.resolveTo({
      json: () => Promise.resolve([]),
      ok: true
    } as Response);

    fixture = TestBed.createComponent(AddExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
