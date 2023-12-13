import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1TransactionsComponent } from './account-page-type1-transactions.component';

describe('AccountPageType1TransactionsComponent', () => {
  let component: AccountPageType1TransactionsComponent;
  let fixture: ComponentFixture<AccountPageType1TransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1TransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
