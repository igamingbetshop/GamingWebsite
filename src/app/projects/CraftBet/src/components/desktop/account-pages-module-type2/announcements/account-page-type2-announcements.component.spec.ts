import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2AnnouncementsComponent } from './account-page-type2-announcements.component';

describe('AccountPageType2AnnouncementsComponent', () => {
  let component: AccountPageType2AnnouncementsComponent;
  let fixture: ComponentFixture<AccountPageType2AnnouncementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2AnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2AnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
