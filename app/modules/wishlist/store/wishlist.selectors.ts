import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from '../models/wishlist.model';

export const selectWishlistState =
    createFeatureSelector<WishlistState>("wishlist");