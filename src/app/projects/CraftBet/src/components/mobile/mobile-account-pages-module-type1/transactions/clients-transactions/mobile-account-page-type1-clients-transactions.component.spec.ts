import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType1ClientsTransactionsComponent } from './mobile-account-page-type1-clients-transactions.component';

describe('MobileAccountPageType1ClientsTransactionsComponent', () => {
  let component: MobileAccountPageType1ClientsTransactionsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1ClientsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAccountPageType1ClientsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAccountPageType1ClientsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
