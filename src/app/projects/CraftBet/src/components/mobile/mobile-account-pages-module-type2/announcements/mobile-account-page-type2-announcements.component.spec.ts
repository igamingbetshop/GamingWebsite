import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2AnnouncementsComponent } from './mobile-account-page-type2-announcements.component';

describe('MobileAccountPageType2AnnouncementsComponent', () => {
  let component: MobileAccountPageType2AnnouncementsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2AnnouncementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2AnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2AnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
