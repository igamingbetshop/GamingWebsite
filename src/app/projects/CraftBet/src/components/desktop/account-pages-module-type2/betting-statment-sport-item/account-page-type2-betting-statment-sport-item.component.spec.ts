import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2BettingStatmentSportItemComponent } from './account-page-type2-betting-statment-sport-item.component';

describe('AccountPageType2BettingStatmentSportItemComponent', () => {
  let component: AccountPageType2BettingStatmentSportItemComponent;
  let fixture: ComponentFixture<AccountPageType2BettingStatmentSportItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2BettingStatmentSportItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2BettingStatmentSportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
