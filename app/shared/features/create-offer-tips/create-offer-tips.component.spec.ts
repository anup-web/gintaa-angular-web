import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfferTipsComponent } from './create-offer-tips.component';

describe('CreateOfferTipsComponent', () => {
  let component: CreateOfferTipsComponent;
  let fixture: ComponentFixture<CreateOfferTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOfferTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfferTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
