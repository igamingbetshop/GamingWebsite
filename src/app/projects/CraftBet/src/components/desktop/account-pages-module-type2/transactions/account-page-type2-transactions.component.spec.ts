import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2TransactionsComponent } from './account-page-type2-transactions.component';

describe('AccountPageType2TransactionsComponent', () => {
  let component: AccountPageType2TransactionsComponent;
  let fixture: ComponentFixture<AccountPageType2TransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2TransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
