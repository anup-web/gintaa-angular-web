import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@gintaa/core/services';
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Store, select } from '@ngrx/store';

import * as gintaaApp from '../../../../../../../store/app.reducer';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';

@Component({
  selector: 'app-change-phone-number-two',
  templateUrl: './change-phone-number-two.component.html',
  styleUrls: ['./change-phone-number-two.component.scss']
})
export class ChangePhoneNumberTwoComponent implements OnInit {

  public newPhone: string = null;
  public phoneNo: string;

  constructor(
    public matDialog: MatDialog, 
    private location: Location, 
    private router: Router,
    public dialogRef: MatDialogRef<any>,
    private store: Store<gintaaApp.AppState>
  ){ }

  ngOnInit(): void {
    this.store.select(selectSettingsState).subscribe(settingsState => {
      this.newPhone    = settingsState.newPhone;

      this.phoneNo    = settingsState.currentPhone;
    });
    // this.getProfileData();
  }

  getProfileData() {
    this.store.dispatch(
      SettingsActions.getProfileData()
    );
  }

  closePopup() {
    this.getProfileData();
    this.dialogRef.close();
  }

}
