import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3CreditCheckComponent } from './account-page-type3-credit-check.component';

describe('CreditCheckComponent', () => {
  let component: AccountPageType3CreditCheckComponent;
  let fixture: ComponentFixture<AccountPageType3CreditCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3CreditCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3CreditCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
