import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType2AgentsTransactionsComponent } from './account-page-type2-agents-transactions.component';

describe('AccountPageType2AgentsTransactionsComponent', () => {
  let component: AccountPageType2AgentsTransactionsComponent;
  let fixture: ComponentFixture<AccountPageType2AgentsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageType2AgentsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageType2AgentsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
