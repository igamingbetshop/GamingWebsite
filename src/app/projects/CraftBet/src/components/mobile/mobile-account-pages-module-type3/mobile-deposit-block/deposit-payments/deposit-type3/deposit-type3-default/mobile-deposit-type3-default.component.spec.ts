import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType3DefaultComponent } from './mobile-deposit-type3-default.component';

describe('MobileDepositType3DefaultComponent', () => {
  let component: MobileDepositType3DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType3DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType3DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType3DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
