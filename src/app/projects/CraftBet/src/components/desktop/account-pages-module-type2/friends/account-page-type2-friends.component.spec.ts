import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2FriendsComponent } from './account-page-type2-friends.component';

describe('AccountPageType2FriendsComponent', () => {
  let component: AccountPageType2FriendsComponent;
  let fixture: ComponentFixture<AccountPageType2FriendsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2FriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
