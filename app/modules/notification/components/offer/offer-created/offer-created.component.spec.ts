import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCreatedComponent } from './offer-created.component';

describe('OfferCreatedComponent', () => {
  let component: OfferCreatedComponent;
  let fixture: ComponentFixture<OfferCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferCreatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
