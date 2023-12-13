import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1HistoryComponent } from './account-page-type1-history.component';

describe('AccountPageType1HistoryComponent', () => {
  let component: AccountPageType1HistoryComponent;
  let fixture: ComponentFixture<AccountPageType1HistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1HistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
