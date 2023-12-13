import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType12DefaultComponent } from './mobile-withdraw-type12-default.component';

describe('MobileWithdrawType12DefaultComponent', () => {
  let component: MobileWithdrawType12DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType12DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType12DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType12DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
