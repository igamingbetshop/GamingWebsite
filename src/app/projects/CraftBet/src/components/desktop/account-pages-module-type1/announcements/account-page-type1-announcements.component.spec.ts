import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1AnnouncementsComponent } from './account-page-type1-announcements.component';

describe('AccountPageType1AnnouncementsComponent', () => {
  let component: AccountPageType1AnnouncementsComponent;
  let fixture: ComponentFixture<AccountPageType1AnnouncementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1AnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1AnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
