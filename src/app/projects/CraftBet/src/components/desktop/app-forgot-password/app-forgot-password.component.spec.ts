import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppForgotPasswordComponent } from './app-forgot-password.component';

describe('AppForgotPasswordComponent', () => {
  let component: AppForgotPasswordComponent;
  let fixture: ComponentFixture<AppForgotPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
