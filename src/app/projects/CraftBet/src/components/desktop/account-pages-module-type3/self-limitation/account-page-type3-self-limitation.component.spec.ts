import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3SelfLimitationComponent } from './account-page-type3-self-limitation.component';

describe('AccountPageType3SelfLimitationComponent', () => {
  let component: AccountPageType3SelfLimitationComponent;
  let fixture: ComponentFixture<AccountPageType3SelfLimitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3SelfLimitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3SelfLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
