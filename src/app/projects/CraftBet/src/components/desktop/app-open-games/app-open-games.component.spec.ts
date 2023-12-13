import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppOpenGamesComponent } from './app-open-games.component';

describe('AppOpenGamesComponent', () => {
  let component: AppOpenGamesComponent;
  let fixture: ComponentFixture<AppOpenGamesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppOpenGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOpenGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
