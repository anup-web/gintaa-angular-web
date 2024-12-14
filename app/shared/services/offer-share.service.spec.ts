import { TestBed } from '@angular/core/testing';

import { OfferShareService } from './offer-share.service';

describe('OfferShareService', () => {
  let service: OfferShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
