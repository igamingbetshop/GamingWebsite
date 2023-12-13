import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1FriendsComponent } from './mobile-account-page-type1-friends.component';

describe('MobileAccountPageType1FriendsComponent', () => {
  let component: MobileAccountPageType1FriendsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1FriendsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1FriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
