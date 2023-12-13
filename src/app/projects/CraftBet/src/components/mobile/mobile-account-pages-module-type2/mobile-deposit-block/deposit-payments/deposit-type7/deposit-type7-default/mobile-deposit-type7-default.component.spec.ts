import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType7DefaultComponent } from './mobile-deposit-type7-default.component';

describe('MobileDepositType7DefaultComponent', () => {
  let component: MobileDepositType7DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType7DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType7DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType7DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
