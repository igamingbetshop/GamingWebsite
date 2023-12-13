import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2FriendsComponent } from './mobile-account-page-type2-friends.component';

describe('MobileAccountPageType2FriendsComponent', () => {
  let component: MobileAccountPageType2FriendsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2FriendsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2FriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
