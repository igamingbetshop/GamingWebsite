import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3ChangePasswordComponent } from './account-page-type3-change-password.component';

describe('AccountPageType3ChangePasswordComponent', () => {
  let component: AccountPageType3ChangePasswordComponent;
  let fixture: ComponentFixture<AccountPageType3ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3ChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
