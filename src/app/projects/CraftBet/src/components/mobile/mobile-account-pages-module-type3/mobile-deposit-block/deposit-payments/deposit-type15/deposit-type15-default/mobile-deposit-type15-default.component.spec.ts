import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType15DefaultComponent } from './mobile-deposit-type15-default.component';

describe('MobileDepositType15DefaultComponent', () => {
  let component: MobileDepositType15DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType15DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType15DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType15DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
