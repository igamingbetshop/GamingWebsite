import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType8DefaultComponent } from './mobile-deposit-type8-default.component';

describe('MobileDepositType8DefaultComponent', () => {
  let component: MobileDepositType8DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType8DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType8DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType8DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
