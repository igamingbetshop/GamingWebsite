import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1HistoryComponent } from './mobile-account-page-type1-history.component';

describe('MobileAccountPageType1HistoryComponent', () => {
  let component: MobileAccountPageType1HistoryComponent;
  let fixture: ComponentFixture<MobileAccountPageType1HistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1HistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
