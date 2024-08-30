import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType1AgentsTransactionsComponent } from './mobile-account-page-type1-agents-transactions.component';

describe('MobileAccountPageType1AgentsTransactionsComponent', () => {
  let component: MobileAccountPageType1AgentsTransactionsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1AgentsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAccountPageType1AgentsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAccountPageType1AgentsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
