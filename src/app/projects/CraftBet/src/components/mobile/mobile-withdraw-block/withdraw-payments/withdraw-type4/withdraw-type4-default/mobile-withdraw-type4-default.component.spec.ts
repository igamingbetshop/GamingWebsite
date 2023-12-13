import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType4DefaultComponent } from './mobile-withdraw-type4-default.component';

describe('MobileWithdrawType4DefaultComponent', () => {
  let component: MobileWithdrawType4DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType4DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType4DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType4DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
