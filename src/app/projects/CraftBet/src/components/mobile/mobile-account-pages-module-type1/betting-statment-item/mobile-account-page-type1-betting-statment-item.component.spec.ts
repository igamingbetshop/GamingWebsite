import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1BettingStatmentItemComponent } from './mobile-account-page-type1-betting-statment-item.component';

describe('MobileAccountPageType1BettingStatmentItemComponent', () => {
  let component: MobileAccountPageType1BettingStatmentItemComponent;
  let fixture: ComponentFixture<MobileAccountPageType1BettingStatmentItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1BettingStatmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1BettingStatmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
