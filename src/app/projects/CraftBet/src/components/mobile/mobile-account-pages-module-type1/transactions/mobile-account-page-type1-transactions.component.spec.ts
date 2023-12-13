import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1TransactionsComponent } from './mobile-account-page-type1-transactions.component';

describe('MobileAccountPageType1TransactionsComponent', () => {
  let component: MobileAccountPageType1TransactionsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1TransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1TransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
