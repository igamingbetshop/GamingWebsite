import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomBlockBettingStatementItemComponent } from './custom-block-betting-statement-item.component';

describe('CustomBlockBettingStatementItemComponent', () => {
  let component: CustomBlockBettingStatementItemComponent;
  let fixture: ComponentFixture<CustomBlockBettingStatementItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBlockBettingStatementItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBlockBettingStatementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
