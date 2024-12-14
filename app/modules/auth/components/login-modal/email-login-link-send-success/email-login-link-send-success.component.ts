import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { currentUserEmail, currentAuthErrorMessage, currentUserType } from '@gintaa/modules/auth/store/auth.selectors';
import { noop, timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-login-link-send-success',
  templateUrl: './email-login-link-send-success.component.html',
  styleUrls: ['./email-login-link-send-success.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight]
})
export class EmailLoginLinkSendSuccessComponent implements OnInit {

  
  userEmail: string;
  passwordStrength: string;
  passwordStrengthClass: string;
  hidePassword = true;
  passwordStrengthLabel = 'Password strength :';
  // @ViewChild('userPassword', {static: false}) public userPassword: ElementRef;
  currentPassword: string;
  authErrorMessage: string = null;
  invalidPasswordErrorMessage: string = null;
  userType: string;

  showMailSendSucMsg: boolean = true;
  animationClass: string = '';


  countDown;
  countDuration = 30;
  counter;
  tick = 1000;
  showTimer: boolean;

  constructor(
    private store: Store<gintaaApp.AppState>,
    public firebaseAuthService: FirebaseAuthService,
    public dialogRef: MatDialogRef<EmailLoginLinkSendSuccessComponent>,
  ) { }

  ngOnInit(): void {
    this.automaticClosePopupAfterSignIn();

    this.setTimer();
    this.store.pipe(
      select(currentUserEmail),
      tap(email => this.userEmail = email)
    ).subscribe(
      noop
    );

    this.store.pipe(
      select(currentAuthErrorMessage),
      tap(errorMessage => this.authErrorMessage = errorMessage?.message || null)
    ).subscribe(
      noop
    );

    this.store.pipe(
      select(currentUserType),
      tap(userType => this.userType = userType)
    ).subscribe(
      noop
    );
  }


  movetoEnterPhoneScreen() {
    this.store.dispatch(
      AuthActions.redirectToSignIn()
    );
  }


  setTimer() {
    this.showTimer = true;
    this.counter = this.countDuration
    this.countDown = timer(0, this.tick)
      .pipe(
        take(this.counter),
        map(() => --this.counter)
      );
  }

  resendMagicLink() {
    this.setTimer();
    this.resendLinkAnimation();
    this.store.dispatch(
      AuthActions.signInWithEmailLinkMailSend({ email: this.userEmail })
    )    
  }

  resendLinkAnimation() {
    this.animationClass = '';
    setTimeout(() => {
      this.animationClass = 'animate__animated animate__flash';
    }, 100);
  }


  automaticClosePopupAfterSignIn() {
    this.firebaseAuthService.loggedInUserInfo.subscribe((data: any)=>{
      if(data) {
        this.dialogRef.close();
      }

    });
  }

}
