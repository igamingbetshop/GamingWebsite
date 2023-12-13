import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileForgotPasswordComponent } from './mobile-forgot-password.component';

describe('MobileForgotPasswordComponent', () => {
  let component: MobileForgotPasswordComponent;
  let fixture: ComponentFixture<MobileForgotPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
