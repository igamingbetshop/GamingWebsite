import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType1AgentsTransactionsComponent } from './account-page-type1-agents-transactions.component';

describe('AccountPageType1AgentsTransactionsComponent', () => {
  let component: AccountPageType1AgentsTransactionsComponent;
  let fixture: ComponentFixture<AccountPageType1AgentsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageType1AgentsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageType1AgentsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
