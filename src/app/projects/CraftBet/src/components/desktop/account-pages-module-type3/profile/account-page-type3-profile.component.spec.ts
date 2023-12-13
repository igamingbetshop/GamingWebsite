import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3ProfileComponent } from './account-page-type3-profile.component';

describe('AccountPageType3ProfileComponent', () => {
  let component: AccountPageType3ProfileComponent;
  let fixture: ComponentFixture<AccountPageType3ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3ProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
