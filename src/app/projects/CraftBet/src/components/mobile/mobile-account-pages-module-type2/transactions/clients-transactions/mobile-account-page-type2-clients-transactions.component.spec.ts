import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType2ClientsTransactionsComponent } from './mobile-account-page-type2-clients-transactions.component';

describe('MobileAccountPageType2ClientsTransactionsComponent', () => {
  let component: MobileAccountPageType2ClientsTransactionsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2ClientsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAccountPageType2ClientsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAccountPageType2ClientsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
