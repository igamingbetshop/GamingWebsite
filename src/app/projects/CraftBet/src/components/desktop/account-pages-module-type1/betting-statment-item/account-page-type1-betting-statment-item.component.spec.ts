import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1BettingStatmentItemComponent } from './account-page-type1-betting-statment-item.component';

describe('AccountPageType1BettingStatmentItemComponent', () => {
  let component: AccountPageType1BettingStatmentItemComponent;
  let fixture: ComponentFixture<AccountPageType1BettingStatmentItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1BettingStatmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1BettingStatmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
