import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WithdrawBlockDefaultComponent } from './withdraw-block-default.component';

describe('WithdrawBlockDefaultComponent', () => {
  let component: WithdrawBlockDefaultComponent;
  let fixture: ComponentFixture<WithdrawBlockDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawBlockDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawBlockDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
