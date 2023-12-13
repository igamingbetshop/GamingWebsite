import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2SelfLimitationComponent } from './account-page-type2-self-limitation.component';

describe('AccountPageType2SelfLimitationComponent', () => {
  let component: AccountPageType2SelfLimitationComponent;
  let fixture: ComponentFixture<AccountPageType2SelfLimitationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2SelfLimitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2SelfLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
