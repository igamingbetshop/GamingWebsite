import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomBlockBettingStatementComponent } from './custom-block-betting-statement.component';

describe('CustomBlockBettingStatementComponent', () => {
  let component: CustomBlockBettingStatementComponent;
  let fixture: ComponentFixture<CustomBlockBettingStatementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBlockBettingStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBlockBettingStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
