import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppVerifyEmailComponent } from './app-verify-email.component';

describe('AppVerifyEmailComponent', () => {
  let component: AppVerifyEmailComponent;
  let fixture: ComponentFixture<AppVerifyEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppVerifyEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
