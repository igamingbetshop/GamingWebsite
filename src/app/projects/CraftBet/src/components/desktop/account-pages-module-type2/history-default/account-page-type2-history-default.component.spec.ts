import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2HistoryDefaultComponent } from './account-page-type2-history-default.component';

describe('AccountPageType2DefaultComponent', () => {
  let component: AccountPageType2HistoryDefaultComponent;
  let fixture: ComponentFixture<AccountPageType2HistoryDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2HistoryDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2HistoryDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
