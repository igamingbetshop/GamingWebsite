import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomBlockAnnouncementComponent } from './custom-block-announcement.component';

describe('CustomBlockAnnouncementComponent', () => {
  let component: CustomBlockAnnouncementComponent;
  let fixture: ComponentFixture<CustomBlockAnnouncementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBlockAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBlockAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
