import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2BanksAccountsComponent } from './mobile-account-page-type2-banks-accounts.component';

describe('MobileAccountPageType2BanksAccountsComponent', () => {
  let component: MobileAccountPageType2BanksAccountsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2BanksAccountsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2BanksAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2BanksAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
