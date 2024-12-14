import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFavouriteAnimationComponent } from './empty-favourite-animation.component';

describe('EmptyFavouriteAnimationComponent', () => {
  let component: EmptyFavouriteAnimationComponent;
  let fixture: ComponentFixture<EmptyFavouriteAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyFavouriteAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyFavouriteAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
