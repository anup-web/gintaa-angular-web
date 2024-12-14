import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuggestDealsComponent } from './new-suggest-deals.component';

describe('NewSuggestDealsComponent', () => {
  let component: NewSuggestDealsComponent;
  let fixture: ComponentFixture<NewSuggestDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSuggestDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSuggestDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
