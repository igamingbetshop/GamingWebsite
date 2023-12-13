import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3TransactionsComponent } from './account-page-type3-transactions.component';

describe('AccountPageType3TransactionsComponent', () => {
  let component: AccountPageType3TransactionsComponent;
  let fixture: ComponentFixture<AccountPageType3TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3TransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
