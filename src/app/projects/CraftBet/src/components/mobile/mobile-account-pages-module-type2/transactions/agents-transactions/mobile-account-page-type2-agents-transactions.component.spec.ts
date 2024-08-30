import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType2AgentsTransactionsComponent } from './mobile-account-page-type2-agents-transactions.component';

describe('MobileAccountPageType2AgentsTransactionsComponent', () => {
  let component: MobileAccountPageType2AgentsTransactionsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2AgentsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAccountPageType2AgentsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAccountPageType2AgentsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
