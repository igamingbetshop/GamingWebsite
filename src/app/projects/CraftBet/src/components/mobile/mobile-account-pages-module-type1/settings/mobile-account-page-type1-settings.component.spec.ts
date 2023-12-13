import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1SettingsComponent } from './mobile-account-page-type1-settings.component';

describe('MobileAccountPageType1SettingsComponent', () => {
  let component: MobileAccountPageType1SettingsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1SettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1SettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
