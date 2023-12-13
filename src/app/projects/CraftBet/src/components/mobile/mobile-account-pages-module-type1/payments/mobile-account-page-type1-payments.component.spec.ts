import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1PaymentsComponent } from './mobile-account-page-type1-payments.component';

describe('MobileAccountPageType1PaymentsComponent', () => {
  let component: MobileAccountPageType1PaymentsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1PaymentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1PaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
