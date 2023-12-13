import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomBlockBetListComponent } from './custom-block-bet-list.component';

describe('CustomBlockBetListComponent', () => {
  let component: CustomBlockBetListComponent;
  let fixture: ComponentFixture<CustomBlockBetListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBlockBetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBlockBetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
