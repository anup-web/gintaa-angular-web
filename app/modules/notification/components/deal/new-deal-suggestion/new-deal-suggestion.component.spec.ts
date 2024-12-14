import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDealSuggestionComponent } from './new-deal-suggestion.component';

describe('NewDealSuggestionComponent', () => {
  let component: NewDealSuggestionComponent;
  let fixture: ComponentFixture<NewDealSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDealSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDealSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
