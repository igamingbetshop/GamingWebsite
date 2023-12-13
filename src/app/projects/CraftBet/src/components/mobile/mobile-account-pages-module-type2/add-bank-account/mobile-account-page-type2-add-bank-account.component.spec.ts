import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2AddBankAccountComponent } from './mobile-account-page-type2-add-bank-account.component';

describe('MobileAccountPageType2AddBankAccountComponent', () => {
  let component: MobileAccountPageType2AddBankAccountComponent;
  let fixture: ComponentFixture<MobileAccountPageType2AddBankAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2AddBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2AddBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
