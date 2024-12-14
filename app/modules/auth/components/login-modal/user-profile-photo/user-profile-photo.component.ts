import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Subscription } from 'rxjs';
import { ImageComponent } from '@gintaa/shared/components/image/image.component';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';
import { AuthService } from '@gintaa/modules/auth/services/auth.service';
import {SharedService} from '@gintaa/shared/services/shared.service';
import localization from '@gintaa/config/localization';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
@Component({
  selector: 'app-user-profile-photo',
  templateUrl: './user-profile-photo.component.html',
  styleUrls: ['./user-profile-photo.component.scss']
})
export class UserProfilePhotoComponent implements OnInit {

  @ViewChild('form', { static: false }) form;
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  @Output("updateProfileDate") updateProfileDate: EventEmitter<any> = new EventEmitter();

  name: string;
  size = 120;
  bgColor = '#8BC63E';
  error: string = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadComplete: boolean;
  imageError: string = '';
  picture: string = '';
  isdisabled: boolean = true;
  isImgLoading: boolean = false;
  profileName: string;
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  profileStateSubscriber: Subscription;

  constructor(
    private store: Store<gintaaApp.AppState>,
    public matDialog: MatDialog,
    private authService: AuthService,
    private sharedService: SharedService,
    public firebaseAuthService: FirebaseAuthService,
  ) { }

  ngOnInit(): void {
    // this.firebaseAuthService.updateToken(); 
    this.profileStateSubscriber = this.store.select(selectAuthState).subscribe(authState => {
      if(authState.name){
        this.profileName = authState.name;
        const userNameTemp = authState.name.split(' ');
        this.name = userNameTemp[1] ? (userNameTemp[0] + ' ' + userNameTemp[1]) : userNameTemp[0];
      } else{
        this.name = 'Guest User';
      }

      this.picture = authState.picture || '';
      if(this.picture) {
        this.firebaseAuthService.updateDisplayName(this.profileName, this.picture);
        this.isdisabled = false;
      }
      this.error = authState.profileError || null;
    });
  }

  onSubmit() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = ($event) => {
      var mimeType = fileUpload.files[0]?.type;
      if (mimeType.match(/image\/*/) == null) {
        this.imageError = "Invalid image!";
        return;
      }
      this.imageError = '';
      this.openModal(fileUpload.files, $event);
    };
    fileUpload.click();
  }

  openModal(files: any, $event: any) {
    this.updateProfileDate.emit();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'image-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '800px';
    dialogConfig.data = { files, event: $event };

    const modalDialog = this.matDialog.open(ImageComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(results => {
      //console.log(`Dialog closed result: ${JSON.stringify(results)}`);
      this.fileUpload.nativeElement.value = '';
      if (results.files) {
        results.files.forEach( file => {
          this.uploadProfilePic(file);
        });
      }
    });
  }

  private uploadProfilePic(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    this.store.dispatch(
      AuthActions.profileImageUploadStart({ formData })
    );
  }

  saveEmailOrPhone() {
    this.store.dispatch(
      AuthActions.redirectToUpdateProfileDobGender()
    );
  }

  removeProfileImage() {    
    this.authService.removeProfileImage().subscribe(result => {
      if (result['code'] == 200) {
        this.store.dispatch(
          AuthActions.profileImgaeRemoveComplete()
        );
        this.firebaseAuthService.updateDisplayName(this.profileName, 'remove');
        this.sharedService.showToaster(localization.user.REMOVE_PROFILE_IMAGE_SUCCESS, 'success');
      } else {
        this.sharedService.showToaster(localization.user.REMOVE_PROFILE_IMAGE_FAILED, 'warning')
      }
    },
    err =>{
      const message = err.error ? (err.error?.message ? err.error?.message : (err.error?.payload ? (err.error?.payload[0]?.errorDetailedReason ? err.error?.payload[0]?.errorDetailedReason : localization.user.REMOVE_PROFILE_IMAGE_FAILED) : localization.user.REMOVE_PROFILE_IMAGE_FAILED)) : localization.user.REMOVE_PROFILE_IMAGE_FAILED;
      this.sharedService.showToaster(message, 'warning')
    });
  }
  ngOnDestroy() {
    this.profileStateSubscriber.unsubscribe();
  }


}
