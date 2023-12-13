import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2DefaultComponent } from './account-page-type2-default.component';

describe('AccountPageType2DefaultComponent', () => {
  let component: AccountPageType2DefaultComponent;
  let fixture: ComponentFixture<AccountPageType2DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
