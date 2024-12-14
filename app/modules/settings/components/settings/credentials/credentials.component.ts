import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Location } from "@angular/common";
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { Store } from '@ngrx/store';
import * as gintaaApp from '../../../../../store/app.reducer';

import { ChangePopupComponent } from '@gintaa/modules/settings/components/settings/change-popup/change-popup.component';
import { UserProfileResponse} from '@gintaa/modules/profile/models/UserProfileResponse.model';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { ApiLoaderService } from '@gintaa/shared/services';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  userInfo: UserProfileResponse;
  username: string;
  phoneNo: string;
  userEmail: string;
  isLoading: boolean = true;

  constructor(
    public matDialog: MatDialog, 
    private location: Location,
    private store: Store<gintaaApp.AppState>,
    private apiLoaderService: ApiLoaderService,
  ) {}

  ngOnInit(): void {

    setTimeout(()=>{ 
      this.getProfileData();
    },2000);

    this.store.select(selectSettingsState).subscribe(authState => {
      this.phoneNo    = authState.currentPhone;
      this.userEmail  = authState.currentEmail;
      this.isLoading = authState.loading;
      // console.log('errorMessage-----:', authState.loading);
    });

    this.apiLoaderService.isLoading.subscribe((v: boolean)=>{
      this.isLoading = v;
    })

    this.openResetPasswordPopup(this.location.path());
  }
  
  openChangeDialog(actionType: string) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {};
    const modalDialog = this.matDialog.open(ChangePopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
      // console.log(results);
    });

    // 
    switch (actionType) {
      case 'change_password':
        this.redirectToChangePassword();
        break;
      case 'change_email':
        // open change email popup
        this.redirectToChangeEmail();
        break;
      case 'change_phone':
        // open change phone popup
        this.redirectToChangePhone();
        break;
      default:
        this.redirectToChangePassword();
    }
    
  }

  redirectToChangePassword(){
    this.store.dispatch(
      SettingsActions.redirectToChangePassword()
    );
  }

  redirectToChangeEmail(){
    this.store.dispatch(
      SettingsActions.redirectToChangeEmail()
    );
  }

  redirectToChangePhone() {
    this.store.dispatch(
      SettingsActions.redirectToChangePhoneNumber()
    );
  }

  openResetPasswordPopup(currentPath: string) {
    // console.log('currentPath:', currentPath);
    // email: string, name: string, phone: string
    if(currentPath.includes("reset-password")) {
      this.store.dispatch(
        SettingsActions.redirectToResetPasswordConfirm()
      );

      // open reset popup
      const dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.id = 'gintaa-login-component';
      dialogConfig.position = {
        top: '10px',
      };

      dialogConfig.height = 'auto';
      dialogConfig.width = '496px';
      dialogConfig.data = {};
      const modalDialog = this.matDialog.open(ChangePopupComponent, dialogConfig);
      modalDialog.afterClosed().subscribe((results) => {
        // do something with results
        // console.log(results);
      });
      
    }
  }

  getProfileData() {
    this.store.dispatch(
      SettingsActions.getProfileData()
    );
  }

}
