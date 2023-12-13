import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1BettingStatementSportComponent } from './mobile-account-page-type1-betting-statement-sport.component';

describe('MobileAccountPageType1BettingStatementSportComponent', () => {
  let component: MobileAccountPageType1BettingStatementSportComponent;
  let fixture: ComponentFixture<MobileAccountPageType1BettingStatementSportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1BettingStatementSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1BettingStatementSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
