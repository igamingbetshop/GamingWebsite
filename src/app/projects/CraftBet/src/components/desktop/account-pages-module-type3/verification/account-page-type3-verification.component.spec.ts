import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3VerificationComponent } from './account-page-type3-verification.component';

describe('AccountPageType3VerificationComponent', () => {
  let component: AccountPageType3VerificationComponent;
  let fixture: ComponentFixture<AccountPageType3VerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3VerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3VerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
