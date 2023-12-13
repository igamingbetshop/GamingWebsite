import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType2DefaultComponent } from './mobile-withdraw-type2-default.component';

describe('MobileWithdrawType2DefaultComponent', () => {
  let component: MobileWithdrawType2DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType2DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType2DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType2DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
