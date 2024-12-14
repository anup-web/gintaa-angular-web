import { Component, OnInit } from '@angular/core';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-verify-success',
  templateUrl: './email-verify-success.component.html',
  styleUrls: ['./email-verify-success.component.scss']
})
export class EmailVerifySuccessComponent implements OnInit {

  
  public newEmail: string;
  public phone: string;
  public userEmail: string;

  constructor(
    public dialogRef: MatDialogRef<EmailVerifySuccessComponent>,
    private store: Store<gintaaApp.AppState>
  ) { }


  ngOnInit(): void {
    this.store.select(selectSettingsState).subscribe(settingsState => {
      this.userEmail  = settingsState.currentEmail;
    })
  }

  fetchPhoneAndEmailFromStore() {
    this.store.select(selectSettingsState).subscribe(selectSettingsState => {
      this.newEmail  = selectSettingsState.newEmail;
      this.phone     = selectSettingsState.phone;
    });
  }

  closePopup() {
    this.fetchPhoneAndEmailFromStore();
    this.dialogRef.close()
  }

}
