import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileDepositType2DefaultComponent } from './mobile-deposit-type2-default.component';

describe('MobileDepositType2DefaultComponent', () => {
  let component: MobileDepositType2DefaultComponent;
  let fixture: ComponentFixture<MobileDepositType2DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDepositType2DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDepositType2DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
