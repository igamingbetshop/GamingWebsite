import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2BonusesComponent } from './account-page-type2-bonuses.component';

describe('AccountPageType2BonusesComponent', () => {
  let component: AccountPageType2BonusesComponent;
  let fixture: ComponentFixture<AccountPageType2BonusesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2BonusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2BonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
