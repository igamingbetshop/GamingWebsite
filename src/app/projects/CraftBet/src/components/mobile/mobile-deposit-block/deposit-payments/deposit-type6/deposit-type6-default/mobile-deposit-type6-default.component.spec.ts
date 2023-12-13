import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType6DefaultComponent } from './mobile-deposit-type6-default.component';

describe('MobileDepositType6DefaultComponent', () => {
  let component: MobileDepositType6DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType6DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType6DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType6DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
