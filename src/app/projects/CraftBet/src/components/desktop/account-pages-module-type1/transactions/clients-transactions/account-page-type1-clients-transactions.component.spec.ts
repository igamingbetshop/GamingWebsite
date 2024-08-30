import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType1ClientsTransactionsComponent } from './account-page-type1-clients-transactions.component';

describe('AccountPageType1ClientsTransactionsComponent', () => {
  let component: AccountPageType1ClientsTransactionsComponent;
  let fixture: ComponentFixture<AccountPageType1ClientsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageType1ClientsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageType1ClientsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
