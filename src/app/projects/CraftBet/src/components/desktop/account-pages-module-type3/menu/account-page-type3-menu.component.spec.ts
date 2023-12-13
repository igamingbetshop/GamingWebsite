import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3MenuComponent } from './account-page-type3-menu.component';

describe('AccountPageType3MenuComponent', () => {
  let component: AccountPageType3MenuComponent;
  let fixture: ComponentFixture<AccountPageType3MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3MenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
