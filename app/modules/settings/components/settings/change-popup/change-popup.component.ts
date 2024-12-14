import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { CURRENT_SETTINGS_MODAL } from '@gintaa/modules/settings/configs/settings.config';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { currentAuthModal, selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-change-popup',
  templateUrl: './change-popup.component.html',
  styleUrls: ['./change-popup.component.scss']
})
export class ChangePopupComponent implements OnInit {

  allPossibleAuthModals = CURRENT_SETTINGS_MODAL;
  currentAuthModal$: Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<ChangePopupComponent>,
    private router: Router,
    private store: Store<gintaaApp.AppState>
  ) { }

  ngOnInit(): void {
    this.currentAuthModal$ = this.store.pipe(
      select(currentAuthModal)
    );

    this.store.select(selectSettingsState).subscribe(settingsState => {
      if (settingsState.changeCurrentAuthModal) {

          // console.log('changeCurrentAuthModal:', settingsState.changeCurrentAuthModal)
        // switch(settingsState.currentAuthModal) {
        //   case this.allPossibleAuthModals.UPDATE_PROFILE_NAME:
        //     this.store.dispatch(
        //       SettingsActions.redirectToProfileEmailOrPhone()
        //     );
        //     break;

        //   case this.allPossibleAuthModals.UPDATE_PROFILE_EMAIL_OR_PHONE:
        //     this.store.dispatch(
        //       SettingsActions.redirectToUpdateProfileDobGender()
        //     );
        //     break;

        //   default:
        //     this.onDialogClose();
        //     break;
        // }
      }
    });

  }



  closePopup() {
    this.dialogRef.close();
  }

}
