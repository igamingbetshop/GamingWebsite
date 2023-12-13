import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1SettingsComponent } from './account-page-type1-settings.component';

describe('AccountPageType1SettingsComponent', () => {
  let component: AccountPageType1SettingsComponent;
  let fixture: ComponentFixture<AccountPageType1SettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1SettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
