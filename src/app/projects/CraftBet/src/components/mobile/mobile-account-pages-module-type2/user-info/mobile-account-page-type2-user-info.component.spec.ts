import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2UserInfoComponent } from './mobile-account-page-type2-user-info.component';

describe('MobileAccountPageType2UserInfoComponent', () => {
  let component: MobileAccountPageType2UserInfoComponent;
  let fixture: ComponentFixture<MobileAccountPageType2UserInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2UserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
