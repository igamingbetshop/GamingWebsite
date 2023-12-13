import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1ChangePasswordComponent } from './account-page-type1-change-password.component';

describe('AccountPageType1ChangePasswordComponent', () => {
  let component: AccountPageType1ChangePasswordComponent;
  let fixture: ComponentFixture<AccountPageType1ChangePasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1ChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
