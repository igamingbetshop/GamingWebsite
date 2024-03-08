import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType10DefaultComponent } from './mobile-deposit-type10-default.component';

describe('MobileDepositType10DefaultComponent', () => {
  let component: MobileDepositType10DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType10DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType10DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType10DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
