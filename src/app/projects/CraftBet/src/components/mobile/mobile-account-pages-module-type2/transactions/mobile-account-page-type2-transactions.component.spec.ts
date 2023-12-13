import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2TransactionsComponent } from './mobile-account-page-type2-transactions.component';

describe('MobileAccountPageType2TransactionsComponent', () => {
  let component: MobileAccountPageType2TransactionsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2TransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2TransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
