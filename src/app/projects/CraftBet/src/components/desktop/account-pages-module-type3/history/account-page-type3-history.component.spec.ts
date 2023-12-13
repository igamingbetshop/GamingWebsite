import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3HistoryComponent } from './account-page-type3-history.component';

describe('AccountPageType3HistoryComponent', () => {
  let component: AccountPageType3HistoryComponent;
  let fixture: ComponentFixture<AccountPageType3HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3HistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
