import { AuthState } from '@gintaa/modules/auth/models/auth.model';
import { ActionReducerMap, ActionReducer, MetaReducer, INIT } from '@ngrx/store';
import { AuthEffects } from '@gintaa/modules/auth/store/auth.effects';
import * as fromAuth from '../modules/auth/store/auth.reducer';
import { environment } from '@gintaa/env';
import { routerReducer } from '@ngrx/router-store';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';

// effects

export interface AppState {
    // auth: AuthState;
}

// export const gintaaReducer: ActionReducerMap<AppState> = {
//     auth: fromAuth.authReducer
// };

export const gintaaReducer: ActionReducerMap<AppState> = {
    router: routerReducer
};

export function logger(reducer:ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        // console.log("state before: ", state);
        // console.log("action", action);
        return reducer(state, action);
    }
}

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
      if ( action != null && action.type === AuthActions.logout.type) {
        return reducer( undefined, {type: INIT});
      }
      return reducer(state, action);
    };
  }

export const metaReducers: MetaReducer<AppState>[] = [logout]
    // !environment.production ? [logger] : [];

export const gintaaEffects = [
    // AuthEffects
];
