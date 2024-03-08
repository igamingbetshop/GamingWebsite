import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType3AddBankAccountsComponent } from './mobile-account-page-type3-add-bank-accounts.component';

describe('MobileAccountPageType3AddBankAccountsComponent', () => {
  let component: MobileAccountPageType3AddBankAccountsComponent;
  let fixture: ComponentFixture<MobileAccountPageType3AddBankAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType3AddBankAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAccountPageType3AddBankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
