import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType6DefaultComponent } from './mobile-withdraw-type6-default.component';

describe('MobileWithdrawType6DefaultComponent', () => {
  let component: MobileWithdrawType6DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType6DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType6DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType6DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
