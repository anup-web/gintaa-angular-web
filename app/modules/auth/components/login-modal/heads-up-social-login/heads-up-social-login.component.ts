import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '../../../../../store/app.reducer';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';
@Component({
  selector: 'app-heads-up-social-login',
  templateUrl: './heads-up-social-login.component.html',
  styleUrls: ['./heads-up-social-login.component.scss']
})
export class HeadsUpSocialLoginComponent implements OnInit {
   authType: string;
  constructor(
    private store: Store<gintaaApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(selectAuthState).subscribe(authState => {
      this.authType = authState.authType;
    });
  }

  signInWithSocialLogin(){
    this.authType === 'Google'? this.signInWithGoogle() : this.signInWithFacebook();
  }

  signInWithGoogle(){
    this.store.dispatch( 
      AuthActions.gmailLoginStart()
    )
  }

  signInWithFacebook(){
    this.store.dispatch( 
      AuthActions.facebookLoginStart()
    )
  }

}
