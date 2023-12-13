import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType1BalanceComponent } from './mobile-account-page-type1-balance.component';

describe('MobileAccountPageType1BalanceComponent', () => {
  let component: MobileAccountPageType1BalanceComponent;
  let fixture: ComponentFixture<MobileAccountPageType1BalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1BalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAccountPageType1BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
