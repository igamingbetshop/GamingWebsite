import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType9DefaultComponent } from './mobile-deposit-type9-default.component';

describe('MobileDepositType9DefaultComponent', () => {
  let component: MobileDepositType9DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType9DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType9DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType9DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
