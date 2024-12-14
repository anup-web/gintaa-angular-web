import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyChatAnimationComponent } from './empty-chat-animation.component';

describe('EmptyChatAnimationComponent', () => {
  let component: EmptyChatAnimationComponent;
  let fixture: ComponentFixture<EmptyChatAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyChatAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyChatAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
