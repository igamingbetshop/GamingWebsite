import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3PaymentsComponent } from './account-page-type3-payments.component';

describe('AccountPageType3PaymentsComponent', () => {
  let component: AccountPageType3PaymentsComponent;
  let fixture: ComponentFixture<AccountPageType3PaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3PaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
