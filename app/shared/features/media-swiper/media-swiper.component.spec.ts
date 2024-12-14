import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSwiperComponent } from './media-swiper.component';

describe('MediaSwiperComponent', () => {
  let component: MediaSwiperComponent;
  let fixture: ComponentFixture<MediaSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
