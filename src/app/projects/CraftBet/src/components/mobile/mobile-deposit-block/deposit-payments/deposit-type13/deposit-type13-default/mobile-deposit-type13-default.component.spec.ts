import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType11DefaultComponent } from './mobile-deposit-type11-default.component';

describe('MobileDepositType11DefaultComponent', () => {
  let component: MobileDepositType11DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType11DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType11DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType11DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
