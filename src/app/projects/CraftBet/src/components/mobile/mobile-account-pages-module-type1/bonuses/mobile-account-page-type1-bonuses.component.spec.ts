import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1BonusesComponent } from './mobile-account-page-type1-bonuses.component';

describe('MobileAccountPageType1BonusesComponent', () => {
  let component: MobileAccountPageType1BonusesComponent;
  let fixture: ComponentFixture<MobileAccountPageType1BonusesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1BonusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1BonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
