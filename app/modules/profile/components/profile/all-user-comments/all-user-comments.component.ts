import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import { selectfeedbackLoader, selectUserAllFeedback } from '@gintaa/modules/profile/store/profile.selectors';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-user-comments',
  templateUrl: './all-user-comments.component.html',
  styleUrls: ['./all-user-comments.component.scss']
})
export class AllUserCommentsComponent implements OnInit, OnDestroy {

  feedbackSubscriber: Subscription;
  feedbackLoaderSubscriber: Subscription;
  userId: string;
  userAllFeedback: any[] = [];
  isPageLoading: boolean = true;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get("userId");
      if (this.userId) {
        this.getUserFeedback(this.userId);
      }
    });

    this.feedbackLoaderSubscriber = this.store.select(selectfeedbackLoader).subscribe((loading: boolean) => {
      this.isPageLoading = loading;
    });

    this.feedbackSubscriber = this.store.select(selectUserAllFeedback).subscribe((offerState: any) => {
      this.userAllFeedback = offerState;
    });
  }

  getUserFeedback(userId: string) {
    const queryString = '/sortPreferance?sortBy=Recent';
    this.store.dispatch(
      ProfileActions.fetchUserFeedBack({queryString, userId})
    );
  }

  navigateToOtherProfile() {
    this.router.navigate([`profile/${this.userId}/view`]);
  }

  counter(i: any) {
    return new Array(i);
  }

  ngOnDestroy() {
    this.feedbackSubscriber.unsubscribe();
    this.feedbackLoaderSubscriber.unsubscribe();
  }
}
