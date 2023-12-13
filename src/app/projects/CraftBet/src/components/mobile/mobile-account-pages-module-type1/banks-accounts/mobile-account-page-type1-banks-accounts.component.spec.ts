import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1BanksAccountsComponent } from './mobile-account-page-type1-banks-accounts.component';

describe('MobileAccountPageType1BanksAccountsComponent', () => {
  let component: MobileAccountPageType1BanksAccountsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1BanksAccountsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1BanksAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1BanksAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
