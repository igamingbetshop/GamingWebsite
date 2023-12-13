import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2MenuComponent } from './account-page-type2-menu.component';

describe('AccountPageType2MenuComponent', () => {
  let component: AccountPageType2MenuComponent;
  let fixture: ComponentFixture<AccountPageType2MenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
