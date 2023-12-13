import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1AddBankAccountComponent } from './mobile-account-page-type1-add-bank-account.component';

describe('MobileAccountPageType1AddBankAccountComponent', () => {
  let component: MobileAccountPageType1AddBankAccountComponent;
  let fixture: ComponentFixture<MobileAccountPageType1AddBankAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1AddBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1AddBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
