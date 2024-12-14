import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDraftOfferPopupComponent } from './delete-draft-offer-popup.component';

describe('DeleteDraftOfferPopupComponent', () => {
  let component: DeleteDraftOfferPopupComponent;
  let fixture: ComponentFixture<DeleteDraftOfferPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDraftOfferPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDraftOfferPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
