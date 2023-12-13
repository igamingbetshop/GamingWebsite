import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2BetsComponent } from './account-page-type2-bets.component';

describe('AccountPageType2BetsComponent', () => {
  let component: AccountPageType2BetsComponent;
  let fixture: ComponentFixture<AccountPageType2BetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2BetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2BetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
