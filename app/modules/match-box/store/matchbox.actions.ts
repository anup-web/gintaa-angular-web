import { createAction, props } from '@ngrx/store';
import { MATCH_ACTION_TYPE } from '../configs/match.config';
import {
    MatchBoxAvailableTabs,
  } from '@gintaa/modules/match-box/models/matchbox.model';

export const fetchMatchboxData = createAction(
    MATCH_ACTION_TYPE.MATCH_BOX_FETCH,
    props<{
        input: string;
        matchBoxType: MatchBoxAvailableTabs;
        matchCountMax: string
    }>()
);

export const matchBoxDataSuccess = createAction(
    MATCH_ACTION_TYPE.MATCH_BOX_DATA_SUCCESS,
    props<{
        matchBox: any,
        store: string
    }>()
);

export const matchBoxDataFailure = createAction(
    MATCH_ACTION_TYPE.MATCH_BOX_DATA_FAILURE,
    props<{
        error: any,
        store: string
    }>()
);

export const changeSearchMatchBox = createAction(
    MATCH_ACTION_TYPE.CHANGE_SELECTED_CATEGORY,
    props<{
        searchMatchBox: any,
    }>()
);
export const clearMatchboxData = createAction(
    MATCH_ACTION_TYPE.CLEAR_MATCH_BOX_DATA,
);
