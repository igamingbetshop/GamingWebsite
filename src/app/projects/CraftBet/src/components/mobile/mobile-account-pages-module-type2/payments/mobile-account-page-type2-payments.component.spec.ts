import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2PaymentsComponent } from './mobile-account-page-type2-payments.component';

describe('MobileAccountPageType2PaymentsComponent', () => {
  let component: MobileAccountPageType2PaymentsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2PaymentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2PaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
