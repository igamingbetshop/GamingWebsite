import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType4DefaultComponent } from './mobile-deposit-type4-default.component';

describe('MobileDepositType4DefaultComponent', () => {
  let component: MobileDepositType4DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType4DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType4DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType4DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
