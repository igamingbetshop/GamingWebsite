import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1FriendsComponent } from './account-page-type1-friends.component';

describe('AccountPageType1FriendsComponent', () => {
  let component: AccountPageType1FriendsComponent;
  let fixture: ComponentFixture<AccountPageType1FriendsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1FriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
