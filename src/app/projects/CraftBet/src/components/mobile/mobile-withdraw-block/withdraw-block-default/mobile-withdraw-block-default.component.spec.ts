import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawBlockDefaultComponent } from './mobile-withdraw-block-default.component';

describe('MobileWithdrawBlockDefaultComponent', () => {
  let component: MobileWithdrawBlockDefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawBlockDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawBlockDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawBlockDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
