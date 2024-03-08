import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType7DefaultComponent } from './mobile-withdraw-type7-default.component';

describe('MobileWithdrawType7DefaultComponent', () => {
  let component: MobileWithdrawType7DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType7DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType7DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType7DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
