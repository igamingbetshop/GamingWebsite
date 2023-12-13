import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2MenuStatementComponent } from './account-page-type2-menu-statement.component';

describe('AccountPageType2StatementComponent', () => {
  let component: AccountPageType2MenuStatementComponent;
  let fixture: ComponentFixture<AccountPageType2MenuStatementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2MenuStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2MenuStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
