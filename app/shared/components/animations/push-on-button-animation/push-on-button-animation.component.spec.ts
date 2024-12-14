import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushOnButtonAnimationComponent } from './push-on-button-animation.component';

describe('PushOnButtonAnimationComponent', () => {
  let component: PushOnButtonAnimationComponent;
  let fixture: ComponentFixture<PushOnButtonAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushOnButtonAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushOnButtonAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
