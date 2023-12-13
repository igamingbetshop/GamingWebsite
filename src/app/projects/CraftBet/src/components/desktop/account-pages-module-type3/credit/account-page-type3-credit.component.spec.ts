import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3CreditComponent } from './account-page-type3-credit.component';

describe('AccountPageType3CreditComponent', () => {
  let component: AccountPageType3CreditComponent;
  let fixture: ComponentFixture<AccountPageType3CreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3CreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3CreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
