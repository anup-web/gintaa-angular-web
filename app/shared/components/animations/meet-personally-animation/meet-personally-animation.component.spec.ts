import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetPersonallyAnimationComponent } from './meet-personally-animation.component';

describe('MeetPersonallyAnimationComponent', () => {
  let component: MeetPersonallyAnimationComponent;
  let fixture: ComponentFixture<MeetPersonallyAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetPersonallyAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetPersonallyAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
