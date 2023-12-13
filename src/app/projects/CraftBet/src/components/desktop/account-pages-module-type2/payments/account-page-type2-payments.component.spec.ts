import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2PaymentsComponent } from './account-page-type2-payments.component';

describe('AccountPageType2PaymentsComponent', () => {
  let component: AccountPageType2PaymentsComponent;
  let fixture: ComponentFixture<AccountPageType2PaymentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2PaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
