import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2StatementComponent } from './account-page-type2-statement.component';

describe('AccountPageType2StatementComponent', () => {
  let component: AccountPageType2StatementComponent;
  let fixture: ComponentFixture<AccountPageType2StatementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2StatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2StatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
