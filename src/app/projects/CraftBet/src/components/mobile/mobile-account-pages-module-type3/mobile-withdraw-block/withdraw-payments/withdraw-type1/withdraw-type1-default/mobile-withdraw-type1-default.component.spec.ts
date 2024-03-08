import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType1DefaultComponent } from './mobile-withdraw-type1-default.component';

describe('MobileWithdrawType1DefaultComponent', () => {
  let component: MobileWithdrawType1DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType1DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType1DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType1DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
