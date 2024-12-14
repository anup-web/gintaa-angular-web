import { Action, createReducer, on } from '@ngrx/store';
import {MatchBoxAvailableTabs, MatchBoxState } from  '../models/matchbox.model';
import { MatchBoxActions } from './action-types';

export const initialMatchBoxState: MatchBoxState = {
  loading: true,
  successMessage: null,
  errorMessage: null,
  defaultOption: MatchBoxAvailableTabs.EXISTING_OFFER,
  currentOption: MatchBoxAvailableTabs.EXISTING_OFFER,
  maxWaitUntil: 10,
  myMatchBox: {
    existing: [],
    potential: []
  },
  searchMatchBox: {
    reload: false,
    text: '',
    category: '',
  }
};

const _matchBoxReducer = createReducer(

  initialMatchBoxState,
  on(
    MatchBoxActions.fetchMatchboxData,
    (state) => ({
      ...state,
      loading: true,
      // myMatchBox: {
      //   existing: [],
      //   potential: []
      // },
      errorMessage: null,
    })
  ),
  on(
    MatchBoxActions.clearMatchboxData,
    (state) => ({
      ...state,
      loading: false,
      myMatchBox: {
        existing: [],
        potential: []
      },
      searchMatchBox: {
        reload: false,
        text: '',
        category: '',
      },
      errorMessage: null,
    })
  ),
  on(
    MatchBoxActions.matchBoxDataSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      myMatchBox: {
        ...state.myMatchBox,
        [action.store]: action.matchBox,
      },
      currentOption: action.store,
      // searchMatchBox:  action.store === 'existing' ? {reload: false, text: '',category: ''} : state.searchMatchBox,
      errorMessage: null,
    })
  ),
  on(
    MatchBoxActions.matchBoxDataFailure,
    (state, action) => ({
      ...state,
      loading: false,
      myMatchBox: {
        ...state.myMatchBox,
        [action.store]: []
      },
      currentOption: action.store,
      errorMessage: 'Error while fetching offer',
    })
  ),
  on(
    MatchBoxActions.changeSearchMatchBox,
    (state, action) => ({
      ...state,
      searchMatchBox: action.searchMatchBox,     
    })
  ),
  
);

export function matchBoxReducer(state: MatchBoxState, action: Action) {
    return _matchBoxReducer(state, action);
}
