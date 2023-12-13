import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2BettingStatementSportComponent } from './mobile-account-page-type2-betting-statement-sport.component';

describe('MobileAccountPageType2BettingStatementSportComponent', () => {
  let component: MobileAccountPageType2BettingStatementSportComponent;
  let fixture: ComponentFixture<MobileAccountPageType2BettingStatementSportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2BettingStatementSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2BettingStatementSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
