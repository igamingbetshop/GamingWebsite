import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1OpenTicketsComponent } from './account-page-type1-open-tickets.component';

describe('AccountPageType1OpenTicketsComponent', () => {
  let component: AccountPageType1OpenTicketsComponent;
  let fixture: ComponentFixture<AccountPageType1OpenTicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1OpenTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1OpenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
