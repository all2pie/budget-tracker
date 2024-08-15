import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { expensesMock } from '../../common/mocks/expense.mock';
import { adminMock, userMock } from '../../common/mocks/user.mock';
import { user } from '../../common/state/user.state';
import { ExpenseService } from './expense.service';
import { ExpensesComponent } from './expenses.component';
import { BaseService } from '../../common/services/http-base.service';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    user.set(userMock);

    TestBed.configureTestingModule({
      imports: [ExpensesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNativeDateAdapter(),
        provideAnimations(),
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Add Expense button', () => {
    it('should be visible for user', async () => {
      const text = fixture.nativeElement.textContent;
      expect(text).toContain('Add Expense');
    });

    it('should not be visible for admin', async () => {
      user.set(adminMock);
      await fixture.whenStable();

      const text = fixture.nativeElement.textContent;
      expect(text).not.toContain('Add Expense');
    });
  });

  it('should display 7 items if 7 expenses are returned form API', async () => {
    const mockResponse: Awaited<ReturnType<ExpenseService['getAllExpenses']>> =
      {
        data: expensesMock,
        metadata: {
          total: 7,
        },
      };

    const req = httpTesting.expectOne(
      `${BaseService.baseUrl}/expense/?limit=10&skip=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    TestBed.inject(HttpTestingController).verify();

    fixture.detectChanges();
    await fixture.whenStable();

    const rows = fixture.nativeElement.querySelectorAll('tbody > tr');

    expect(rows.length).toBe(7);
  });

  describe('Filters', () => {
    it('search should work correctly', async () => {
      const initialReq = httpTesting.expectOne(
        `${BaseService.baseUrl}/expense/?limit=10&skip=0`
      );
      initialReq.flush({
        data: expensesMock,
        metadata: {
          total: 7,
        },
      });

      const searchInput = fixture.nativeElement.querySelector(
        'input[formControlName="search"]'
      );

      searchInput.value = '3';
      searchInput.dispatchEvent(new Event('input'));

      await fixture.whenStable();

      expect(component.fg.value.search).toBe('3');

      const mockResponse: Awaited<
        ReturnType<ExpenseService['getAllExpenses']>
      > = {
        data: expensesMock.filter((expense) => expense.title.includes('3')),
        metadata: {
          total: 1,
        },
      };

      const req = httpTesting.expectOne(
        `${BaseService.baseUrl}/expense/?limit=10&skip=0&title=%2F3%2Fi`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
      TestBed.inject(HttpTestingController).verify();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dataSource.data.length).toBe(1);
      expect(component.dataSource.data[0].title).toBe('3');
    });
  });

  describe('Sorting', () => {
    it('should sort properly', async () => {
      const initialReq = httpTesting.expectOne(
        `${BaseService.baseUrl}/expense/?limit=10&skip=0`
      );
      initialReq.flush({
        data: expensesMock,
        metadata: {
          total: 7,
        },
      });

      const sortSelect = fixture.nativeElement.querySelector(
        'mat-select[formControlName="sort"]'
      );

      sortSelect.click();

      fixture.detectChanges();

      const option = document.querySelector(
        'mat-option[ng-reflect-value="-price"]'
      ) as HTMLElement;

      option.click();

      expect(component.fg.value.sort).toBe('-price');

      await fixture.whenStable();

      const req = httpTesting.expectOne(
        `${BaseService.baseUrl}/expense/?limit=10&skip=0&sort=-price`
      );
      req.flush({
        data: expensesMock.sort((a, b) => b.price - a.price),
        metadata: {
          total: 7,
        },
      });

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dataSource.data[0].price).toBe(7);

      TestBed.inject(HttpTestingController).verify();
    });
  });
});
