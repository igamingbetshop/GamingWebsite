import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1PaymentsComponent } from './account-page-type1-payments.component';

describe('AccountPageType1PaymentsComponent', () => {
  let component: AccountPageType1PaymentsComponent;
  let fixture: ComponentFixture<AccountPageType1PaymentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1PaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
