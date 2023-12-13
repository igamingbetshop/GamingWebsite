import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1DefaultComponent } from './account-page-type1-default.component';

describe('AccountPageType1DefaultComponent', () => {
  let component: AccountPageType1DefaultComponent;
  let fixture: ComponentFixture<AccountPageType1DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
