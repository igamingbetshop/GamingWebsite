import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1BonusesComponent } from './account-page-type1-bonuses.component';

describe('AccountPageType1BonusesComponent', () => {
  let component: AccountPageType1BonusesComponent;
  let fixture: ComponentFixture<AccountPageType1BonusesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1BonusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1BonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
