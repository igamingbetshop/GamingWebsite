import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3OpenTicketsComponent } from './account-page-type3-open-tickets.component';

describe('AccountPageType3OpenTicketsComponent', () => {
  let component: AccountPageType3OpenTicketsComponent;
  let fixture: ComponentFixture<AccountPageType3OpenTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3OpenTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3OpenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
