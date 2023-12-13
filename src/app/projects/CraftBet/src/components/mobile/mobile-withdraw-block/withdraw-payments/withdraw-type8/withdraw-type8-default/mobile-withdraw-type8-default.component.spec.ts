import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType8DefaultComponent } from './mobile-withdraw-type8-default.component';

describe('MobileWithdrawType8DefaultComponent', () => {
  let component: MobileWithdrawType8DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType8DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType8DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType8DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
