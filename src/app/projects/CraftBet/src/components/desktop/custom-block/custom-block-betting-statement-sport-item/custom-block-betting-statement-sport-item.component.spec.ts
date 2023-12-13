import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomBlockBettingStatementSportItemComponent } from './custom-block-betting-statement-sport-item.component';

describe('CustomBlockBettingStatementSportItemComponent', () => {
  let component: CustomBlockBettingStatementSportItemComponent;
  let fixture: ComponentFixture<CustomBlockBettingStatementSportItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBlockBettingStatementSportItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBlockBettingStatementSportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
