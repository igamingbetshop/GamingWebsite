import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3PaymentComponent } from './account-page-type3-payment.component';

describe('AccountPageType3Pay3000Component', () => {
  let component: AccountPageType3PaymentComponent;
  let fixture: ComponentFixture<AccountPageType3PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3PaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
