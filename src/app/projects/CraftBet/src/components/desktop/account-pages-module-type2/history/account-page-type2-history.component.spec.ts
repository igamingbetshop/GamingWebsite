import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2HistoryComponent } from './account-page-type2-history.component';

describe('AccountPageType2HistoryComponent', () => {
  let component: AccountPageType2HistoryComponent;
  let fixture: ComponentFixture<AccountPageType2HistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2HistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
