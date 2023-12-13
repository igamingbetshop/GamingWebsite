import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1BettingStatmentSportItemComponent } from './account-page-type1-betting-statment-sport-item.component';

describe('AccountPageType1BettingStatmentSportItemComponent', () => {
  let component: AccountPageType1BettingStatmentSportItemComponent;
  let fixture: ComponentFixture<AccountPageType1BettingStatmentSportItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1BettingStatmentSportItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1BettingStatmentSportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
