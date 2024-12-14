import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavouriteState } from '../models/favourite.model';

export const selectFavouriteState =
    createFeatureSelector<FavouriteState>("favourite-offer");
