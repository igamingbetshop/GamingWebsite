import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2BankAccountsComponent } from './account-page-type2-bank-accounts.component';

describe('AccountPageType2BankAccountsComponent', () => {
  let component: AccountPageType2BankAccountsComponent;
  let fixture: ComponentFixture<AccountPageType2BankAccountsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2BankAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2BankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
