import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType11DefaultComponent } from './mobile-withdraw-type11-default.component';

describe('MobileWithdrawType11DefaultComponent', () => {
  let component: MobileWithdrawType11DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType11DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType11DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType11DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
