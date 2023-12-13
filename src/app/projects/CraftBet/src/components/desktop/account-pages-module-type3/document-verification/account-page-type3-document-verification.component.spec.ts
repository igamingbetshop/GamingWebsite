import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3DocumentVerificationComponent } from './account-page-type3-document-verification.component';

describe('AccountPageType3AccountVerificationComponent', () => {
  let component: AccountPageType3DocumentVerificationComponent;
  let fixture: ComponentFixture<AccountPageType3DocumentVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3DocumentVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3DocumentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
