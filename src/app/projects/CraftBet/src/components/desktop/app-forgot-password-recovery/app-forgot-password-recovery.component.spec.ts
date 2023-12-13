import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppForgotPasswordRecoveryComponent } from './app-forgot-password-recovery.component';

describe('MobileForgotPasswordRecoveryComponent', () => {
  let component: AppForgotPasswordRecoveryComponent;
  let fixture: ComponentFixture<AppForgotPasswordRecoveryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppForgotPasswordRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppForgotPasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
