import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1MenuComponent } from './account-page-type1-menu.component';

describe('AccountPageType1MenuComponent', () => {
  let component: AccountPageType1MenuComponent;
  let fixture: ComponentFixture<AccountPageType1MenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
