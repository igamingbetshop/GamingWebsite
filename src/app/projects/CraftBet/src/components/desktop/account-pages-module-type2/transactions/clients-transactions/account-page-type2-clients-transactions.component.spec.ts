import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType2ClientsTransactionsComponent } from './account-page-type2-clients-transactions.component';

describe('AccountPageType2ClientsTransactionsComponent', () => {
  let component: AccountPageType2ClientsTransactionsComponent;
  let fixture: ComponentFixture<AccountPageType2ClientsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageType2ClientsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageType2ClientsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
