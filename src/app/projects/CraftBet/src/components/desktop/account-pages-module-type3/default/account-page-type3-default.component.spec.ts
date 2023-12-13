import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3DefaultComponent } from './account-page-type3-default.component';

describe('AccountPageType3DefaultComponent', () => {
  let component: AccountPageType3DefaultComponent;
  let fixture: ComponentFixture<AccountPageType3DefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3DefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
