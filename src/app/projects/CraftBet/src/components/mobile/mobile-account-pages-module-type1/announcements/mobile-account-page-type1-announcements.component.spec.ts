import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1AnnouncementsComponent } from './mobile-account-page-type1-announcements.component';

describe('MobileAccountPageType1AnnouncementsComponent', () => {
  let component: MobileAccountPageType1AnnouncementsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1AnnouncementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1AnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1AnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
