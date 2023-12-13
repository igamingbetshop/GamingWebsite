import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1UserInfoComponent } from './mobile-account-page-type1-user-info.component';

describe('MobileAccountPageType1UserInfoComponent', () => {
  let component: MobileAccountPageType1UserInfoComponent;
  let fixture: ComponentFixture<MobileAccountPageType1UserInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1UserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
