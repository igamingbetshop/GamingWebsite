import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2BettingStatmentItemComponent } from './mobile-account-page-type2-betting-statment-item.component';

describe('MobileAccountPageType2BettingStatmentItemComponent', () => {
  let component: MobileAccountPageType2BettingStatmentItemComponent;
  let fixture: ComponentFixture<MobileAccountPageType2BettingStatmentItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2BettingStatmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2BettingStatmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
