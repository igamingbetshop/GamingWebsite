import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2SettingsComponent } from './account-page-type2-settings.component';

describe('AccountPageType2SettingsComponent', () => {
  let component: AccountPageType2SettingsComponent;
  let fixture: ComponentFixture<AccountPageType2SettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2SettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
