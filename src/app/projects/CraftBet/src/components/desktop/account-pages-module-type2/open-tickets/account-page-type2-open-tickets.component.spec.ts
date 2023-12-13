import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2OpenTicketsComponent } from './account-page-type2-open-tickets.component';

describe('AccountPageType2OpenTicketsComponent', () => {
  let component: AccountPageType2OpenTicketsComponent;
  let fixture: ComponentFixture<AccountPageType2OpenTicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2OpenTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2OpenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
