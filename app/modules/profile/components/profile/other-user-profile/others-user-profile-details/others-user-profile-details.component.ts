import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StorageService } from '@gintaa/core/services/storage.service';

import { UserReportBlockComponent } from '@gintaa/modules/profile/components/profile/user-report-block/user-report-block.component';
import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectProfileState } from '@gintaa/modules/profile/store/profile.selectors';
import { UserProfileState } from '@gintaa/modules/profile/models/UserProfileState.model';
import { OtherUserProfileResponse } from '@gintaa/modules/profile/models/UserProfileResponse.model';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { ProfileService } from '@gintaa/modules/profile/services/profile.service';

@Component({
  selector: 'app-others-user-profile-details',
  templateUrl: './others-user-profile-details.component.html',
  styleUrls: ['./others-user-profile-details.component.scss']
})
export class OthersUserProfileDetailsComponent implements OnInit, OnDestroy {

  @Input() userId:string;
  @Input() userName:string;
  @Input() userStatus:any;

  profileStateSubscriber: Subscription;
  userInfo: OtherUserProfileResponse;
  profileImageUrl: string;
  profileName: string;
  location:string;
  stars = [1, 2, 3, 4, 5];
  isPageLoading: boolean = true;
  ratingCountArray=[];
  isNotUser: boolean = true;

  constructor(
    private store: Store<gintaaApp.AppState>,
    public matDialog: MatDialog,
    private storageService: StorageService,
    private sharedService: SharedService,
    private profileService: ProfileService
  ) {
    this.userInfo = new OtherUserProfileResponse;
  }

  ngOnInit(): void {
    this.getAllOtherUserAddress();
    this.profileStateSubscriber = this.store.select(selectProfileState).subscribe((profileState: UserProfileState) => {
      this.userInfo = profileState.otherUserInfo;
      this.isPageLoading = profileState.loading;
      this.profileName = this.userInfo?.displayName;
      
      if(this.userInfo) {
        this.isNotUser = this.storageService.getLoggedInUserId(this.userInfo?.userId);
        this.location=this.userInfo.address?this.userInfo.address[0]?.city:"";
      }
      if (this.userInfo && this.userInfo.images && this.userInfo.images.length > 0) {
        this.profileImageUrl = this.userInfo.images[this.userInfo.images.length-1].url;
      }
      if(this.userInfo && this.userInfo.averageRating>0) {
        this.ratingCountArray=this.count();
      }
    });
  }

  getOtherProfileData(userId: string) {
    this.store.dispatch(
      ProfileActions.fetchOtherProfileData({userId:userId})
    );
  }

  getAllOtherUserAddress() {
    this.store.dispatch(
      ProfileActions.fetchOtherAddressData({userId:this.userId})
    );
  }

  count() {
    return new Array(Math.floor(this.userInfo.averageRating));
  }

  openBlockUserDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {
      profileData: this.userInfo,
    };

    this.profileService.checkAlreadyCallerHasReportedUser(this.userInfo.userId)
      .subscribe((res: any) => {
        // console.log(res);
        if(!res.payload){
          const modalDialog = this.matDialog.open(UserReportBlockComponent, dialogConfig);
          modalDialog.afterClosed().subscribe((results) => {
            // do something with results
            if(results)
            this.sharedService.showToaster(results?.msg, 'success');
          });
        } else {
          this.sharedService.showToaster('User already reported by you', 'success');
        }
      }, (err)=>{
        // console.log(err); 
      })

    
  }

  ngOnDestroy() {
    this.profileStateSubscriber.unsubscribe();
  }

}
