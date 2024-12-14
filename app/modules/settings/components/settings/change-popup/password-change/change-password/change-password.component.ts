import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { Store, select  } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { currentAuthModal, selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { CURRENT_SETTINGS_MODAL } from '@gintaa/modules/settings/configs/settings.config';
import { Observable } from 'rxjs';
import { StorageService } from '@gintaa/core/services/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  allPossibleAuthModals = CURRENT_SETTINGS_MODAL;
  currentAuthModal$: Observable<string>;

  public errorMessage = "";
  public hidePassword = true;

  public currentPassword: string = "";
  public userEmail: string = "";
  public phoneNo: string = "";
  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private store: Store<gintaaApp.AppState>,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    const currentUser = this.storageService.store;
    if (currentUser) {
      this.phoneNo    = currentUser.providerData[0].phoneNumber;
      this.userEmail  = currentUser.providerData[0].email;
    }

    this.store.select(selectSettingsState).subscribe(settingsState => {
      this.errorMessage = settingsState.errorMessage;
    });

    this.currentAuthModal$ = this.store.pipe(
      select(currentAuthModal)
    );
  }

  submitCurrentPassword(currentAuthModal: string) {
    const requestFor = (currentAuthModal === this.allPossibleAuthModals.CHANGE_EMAIL) ? 'change_email' : 'change_pass';
    this.errorMessage = '';
    const password = this.currentPassword;
    if (!password || password.length < 1) {
      this.errorMessage = 'Password required';
      return;
    }
    this.store.dispatch(
      SettingsActions.checkEmailPassword({email: this.userEmail, password: password, requestFor: requestFor})
    );
  }

  redirectToResetPassword() {
    this.store.dispatch(
      SettingsActions.redirectToResetPassword()
    );
  }

}
