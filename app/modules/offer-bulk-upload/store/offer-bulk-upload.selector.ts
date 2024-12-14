import { createFeatureSelector } from '@ngrx/store';
import { BulkOfferState } from '../models/bulk-offer.model';

export const selectOfferBulkUploadState =
    createFeatureSelector<BulkOfferState>("offer-bulk-upload");
