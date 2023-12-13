import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType14DefaultComponent } from './mobile-withdraw-type3-default.component';

describe('MobileWithdrawType3DefaultComponent', () => {
  let component: MobileWithdrawType14DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType14DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType14DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType14DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
