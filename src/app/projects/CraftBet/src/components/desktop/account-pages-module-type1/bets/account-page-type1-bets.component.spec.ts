import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1BetsComponent } from './account-page-type1-bets.component';

describe('AccountPageType1BetsComponent', () => {
  let component: AccountPageType1BetsComponent;
  let fixture: ComponentFixture<AccountPageType1BetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1BetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1BetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
