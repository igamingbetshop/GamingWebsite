import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParentCasinoComponent } from './parent-casino.component';

describe('ParentCasinoComponent', () => {
  let component: ParentCasinoComponent;
  let fixture: ComponentFixture<ParentCasinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentCasinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
