import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2BonusesComponent } from './mobile-account-page-type2-bonuses.component';

describe('MobileAccountPageType2BonusesComponent', () => {
  let component: MobileAccountPageType2BonusesComponent;
  let fixture: ComponentFixture<MobileAccountPageType2BonusesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2BonusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2BonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
