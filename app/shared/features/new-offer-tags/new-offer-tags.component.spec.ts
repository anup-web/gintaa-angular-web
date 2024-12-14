import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferTagsComponent } from './new-offer-tags.component';

describe('NewOfferTagsComponent', () => {
  let component: NewOfferTagsComponent;
  let fixture: ComponentFixture<NewOfferTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOfferTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfferTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
