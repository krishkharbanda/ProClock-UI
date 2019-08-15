import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheeteditComponent } from './timesheetedit.component';

describe('TimesheeteditComponent', () => {
  let component: TimesheeteditComponent;
  let fixture: ComponentFixture<TimesheeteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheeteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheeteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
