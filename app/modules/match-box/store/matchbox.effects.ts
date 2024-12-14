import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatchBoxActions } from './action-types';
import { MatchBoxService } from '../services/matchbox.service';

@Injectable()
export class MatchBoxEffects {

  constructor(
    private matchBoxService: MatchBoxService,
    private actions$: Actions
) { }

  fetchMatchBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchBoxActions.fetchMatchboxData),
      switchMap((action) => {
        return this.matchBoxService.getmatchData(action.input, action.matchBoxType, action.matchCountMax).pipe(
          map((response: any) => {
            return MatchBoxActions.matchBoxDataSuccess({ matchBox:response, store: action.matchBoxType });
          }),
          catchError(error => of(
            MatchBoxActions.matchBoxDataFailure({ error:error.error, store: action.matchBoxType })
          )),
        );
      })
    )
  );

}
