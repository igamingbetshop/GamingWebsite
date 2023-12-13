import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType5DefaultComponent } from './mobile-deposit-type5-default.component';

describe('MobileDepositType5DefaultComponent', () => {
  let component: MobileDepositType5DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType5DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType5DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType5DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
