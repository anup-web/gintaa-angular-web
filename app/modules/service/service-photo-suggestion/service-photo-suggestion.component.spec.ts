import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePhotoSuggestionComponent } from './service-photo-suggestion.component';

describe('ServicePhotoSuggestionComponent', () => {
  let component: ServicePhotoSuggestionComponent;
  let fixture: ComponentFixture<ServicePhotoSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePhotoSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePhotoSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
