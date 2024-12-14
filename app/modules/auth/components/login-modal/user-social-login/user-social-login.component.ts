import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '../../../../../store/app.reducer';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { FeatureListEnum } from '@gintaa/config/enum.config';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
@Component({
  selector: 'app-user-social-login',
  templateUrl: './user-social-login.component.html',
  styleUrls: ['./user-social-login.component.scss']
})
export class UserSocialLoginComponent implements OnInit {

  releaseOffer: boolean = true;

  constructor(
    private store: Store<gintaaApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object,    
    private staticContent: FirebaseStaticContentService
  ) {}

  ngOnInit(): void {    
    this.isReleaseFeature();
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

  socialLoginHeadsUp(type: string){
    // this.store.dispatch(
    //   AuthActions.socialLoginHeadsUpStart({ authType: type})
    // )
    if(type === 'Google'){
      this.signInWithGoogle();
    } else if(type === 'Facebook'){
      this.signInWithFacebook();
    }
  }

  async isReleaseFeature() {    
    this.releaseOffer = await this.staticContent.isFeatureRelease(FeatureListEnum.offer);
    // console.log('releaseOffer:', this.releaseOffer);
  }

}
