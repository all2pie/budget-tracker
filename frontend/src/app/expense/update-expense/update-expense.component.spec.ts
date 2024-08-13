import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpenseComponent } from './update-expense.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('UpdateExpenseComponent', () => {
  let component: UpdateExpenseComponent;
  let fixture: ComponentFixture<UpdateExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateExpenseComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNativeDateAdapter(),
        provideAnimations(),
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => {},
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
