import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1StatementComponent } from './account-page-type1-statement.component';

describe('AccountPageType1StatementComponent', () => {
  let component: AccountPageType1StatementComponent;
  let fixture: ComponentFixture<AccountPageType1StatementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1StatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1StatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
