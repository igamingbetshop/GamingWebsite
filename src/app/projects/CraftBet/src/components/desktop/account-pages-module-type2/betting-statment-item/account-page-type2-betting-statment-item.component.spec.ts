import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2BettingStatmentItemComponent } from './account-page-type2-betting-statment-item.component';

describe('AccountPageType2BettingStatmentItemComponent', () => {
  let component: AccountPageType2BettingStatmentItemComponent;
  let fixture: ComponentFixture<AccountPageType2BettingStatmentItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2BettingStatmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2BettingStatmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
