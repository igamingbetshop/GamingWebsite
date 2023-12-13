import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1BankAccountsComponent } from './account-page-type1-bank-accounts.component';

describe('AccountPageType1BankAccountsComponent', () => {
  let component: AccountPageType1BankAccountsComponent;
  let fixture: ComponentFixture<AccountPageType1BankAccountsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1BankAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1BankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
