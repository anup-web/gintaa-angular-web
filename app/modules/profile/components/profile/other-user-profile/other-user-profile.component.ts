import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { selectProfileState, selectUserAllFeedback, selectfeedbackLoader } from '@gintaa/modules/profile/store/profile.selectors';
import { UserProfileState } from '@gintaa/modules/profile/models/UserProfileState.model';
import { OtherUserProfileResponse } from '@gintaa/modules/profile/models/UserProfileResponse.model';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit, OnDestroy {

  profileStateSubscriber: Subscription;
  userInfo: OtherUserProfileResponse;
  profileImageUrl: string;
  profileName: string;
  stars = [1, 2, 3, 4, 5];
  isPageLoading: boolean = true;
  userId: string;
  userName:string;
  currentOfferId:string;
  userAllFeedback: any[] = [];

  userStatus = {
    last_changed: {
      nanoseconds: 0,
      seconds: 0
    },
    state: "offline"
  }

  constructor(
    private store: Store<gintaaApp.AppState>,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
  ) {
    this.userInfo = new OtherUserProfileResponse;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get("userId");
      if (this.userId) {
        this.getOtherProfileData(this.userId);
        this.getUserFeedback(this.userId);
        this.getOnlineStatus(this.userId);
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.currentOfferId = params.oid;
      this.userName=params.userName;
    });

    this.profileStateSubscriber = this.store.select(selectProfileState).subscribe((profileState: UserProfileState) => {
      this.userInfo = profileState.otherUserInfo;
      this.isPageLoading = profileState.loading;
      this.profileName = this.userInfo?.displayName;
      if (this.userInfo && this.userInfo.images && this.userInfo.images.length > 0) {
        this.profileImageUrl = this.userInfo.images[this.userInfo.images.length-1].url;
      }
    });

    this.store.select(selectfeedbackLoader).subscribe((loading: boolean) => {
      this.isPageLoading = loading;
    });
    this.store.select(selectUserAllFeedback).subscribe((offerState: any) => {
      this.userAllFeedback = offerState;
    });
  }

  getOnlineStatus(userId: string) {
    this.chatService.getOfflineOnlineStatus(userId).subscribe((res) => {
      if(res?.last_changed){
        this.userStatus = res;
      }
    }, (err) => {
    });
  }

  getUserFeedback(userId: string) {
    const queryString = '/sortPreferance?sortBy=Recent';
    this.store.dispatch(
      ProfileActions.fetchUserFeedBack({queryString, userId})
    );
  }

  getOtherProfileData(userId: string) {
    this.store.dispatch(
      ProfileActions.fetchOtherProfileData({userId:userId})
    );
  }

  navigateToOfferList(){
    this.router.navigate([`profile/${this.userId}/offers`],{queryParams:{oid: this.currentOfferId,userName:this.userInfo.displayName}});
  }

  navigateToFeedbackList(){
    this.router.navigate([`profile/${this.userId}/feedback`]);
  }

  navigateBackToOffer(){
    this.router.navigate([`offer/${this.currentOfferId}`]);
  }

  ngOnDestroy() {
    this.profileStateSubscriber.unsubscribe();
  }
}
