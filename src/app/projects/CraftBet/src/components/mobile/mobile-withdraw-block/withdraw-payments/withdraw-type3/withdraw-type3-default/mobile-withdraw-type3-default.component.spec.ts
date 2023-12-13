import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType3DefaultComponent } from './mobile-withdraw-type3-default.component';

describe('MobileWithdrawType3DefaultComponent', () => {
  let component: MobileWithdrawType3DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType3DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType3DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType3DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
