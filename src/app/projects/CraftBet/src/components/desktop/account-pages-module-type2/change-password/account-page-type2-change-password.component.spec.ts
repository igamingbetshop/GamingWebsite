import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2ChangePasswordComponent } from './account-page-type2-change-password.component';

describe('AccountPageType2ChangePasswordComponent', () => {
  let component: AccountPageType2ChangePasswordComponent;
  let fixture: ComponentFixture<AccountPageType2ChangePasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2ChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
