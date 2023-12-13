import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType1DefaultComponent } from './mobile-deposit-type1-default.component';

describe('MobileDepositType1DefaultComponent', () => {
  let component: MobileDepositType1DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType1DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType1DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType1DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
