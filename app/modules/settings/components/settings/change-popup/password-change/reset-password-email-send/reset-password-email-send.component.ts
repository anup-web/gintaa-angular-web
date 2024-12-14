import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { Store } from '@ngrx/store';
import { StorageService } from '@gintaa/core/services/storage.service';
import * as gintaaApp from '@gintaa/store/app.reducer';

@Component({
  selector: 'app-reset-password-email-send',
  templateUrl: './reset-password-email-send.component.html',
  styleUrls: ['./reset-password-email-send.component.scss']
})
export class ResetPasswordEmailSendComponent implements OnInit {

  
  username: string;
  profileUrl: string;
  phoneNo: string;
  userEmail: string;

  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<ResetPasswordEmailSendComponent>,
    private store: Store<gintaaApp.AppState>,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    const currentUser = this.storageService.store;
    if (currentUser) {
      this.phoneNo    = currentUser.providerData[0].phoneNumber;
      this.userEmail  = currentUser.providerData[0].email;
      this.username  = currentUser.providerData[0].displayName;
    }
  }

  redirectToResetPasswordMailSent(){
    this.store.dispatch(
      SettingsActions.resetPasswordMailSend({ email: this.userEmail })
    );
  }

  closePopup() {
    this.dialogRef.close();
  }

}
