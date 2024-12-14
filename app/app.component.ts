import { AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationStart, Router, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@gintaa/core/services/auth.service';
import { ApiLoaderService } from './shared/services/api-loader.service';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { StorageService } from './core/services/storage.service';
import { UtilityActions } from './modules/home/store/action-types';
import { selectUtilityState } from './modules/home/store/utility.selector';
import { takeUntil } from 'rxjs/operators';
import { combineLatest, forkJoin, Subject } from 'rxjs';
import { FirebaseBusinessClaims } from './core/models';
import { PlaceService } from './core/services/place.service';
import { CookieService } from './core/services/cookie.service';
import { isPlatformBrowser } from '@angular/common';
import { AppFireService } from './app-fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {

  private componentDestroyed$: Subject<void> = new Subject<void>();
  title = 'gintaa';
  loading = true;
  isLoading: boolean;
  applicationViewMode: string = 'light';

  constructor(private router: Router,
    private store: Store<AppState>,
    private fireAuth: AngularFireAuth,
    private authService: AuthService,
    private apiLoaderService: ApiLoaderService,
    private cdref: ChangeDetectorRef,
    private storageService: StorageService,
    public firebaseAuthService: FirebaseAuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private placeService: PlaceService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private appFireService: AppFireService
  ) {
    this.isLoading = true;
    this.fireAuth.onIdTokenChanged(async (user) => {
      // console.log('==== user:', user);
      if (user) {
        const authUserData = JSON.parse(JSON.stringify(user));
        const oldToken = this.storageService.store && this.storageService.store.accessToken;
        const token = await user.getIdToken(true); // true = force refresh token
        this.authService.setFirebaseLogin(true);

        if (token !== oldToken) {          

          this.authService.setFirebaseUser(
            user,
            // authUserData.stsTokenManager.accessToken,
            token,
            authUserData.stsTokenManager.expirationTime
          );

          if (!oldToken) {
            // JUST LOGGED IN
            this.refetchHomePageSections('LOGIN');
          }
        }
        this.firebaseAuthService.updateUserInfo({ displayName: user.displayName, photoURL: user.photoURL })

        // BUSINESS CLAIMS TRIGGER
        // this.firebaseAuthService.updateClaimsForUser(user.email ? user.email : null);
        this.subscribeToUtilityStore();
      } else {
        this.authService.setFirebaseLogin(false);
        // this.refetchHomePageSections('LOGOUT');
      }
    })
  }



  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set('_lat', this.placeService.getCookie('search-lat'), 10, null, '.gintaa.com', null, null);
      this.cookieService.set('_lng', this.placeService.getCookie('search-lng'), 10, null, '.gintaa.com', null, null);
      this.cookieService.set('_deviceId', this.placeService.getCookie('history'), 10, null, '.gintaa.com', null, null);
    }
    if (environment.production) {
      // environment production file loaded
    } else {
      // environment dev file loaded
    }
    if (isPlatformBrowser(this.platformId)) {
      combineLatest([
        this.router.events,
        this.route.fragment
      ])
      .subscribe((res) => {
        const routerEvent = res[0] || null;
        const fragmentVal = res[1] || null;
        if (!fragmentVal || fragmentVal == '')
          window.scroll(0, 0);

        switch (true) {
          case routerEvent instanceof NavigationStart: {
            this.loading = true;
            break;
          }
          case routerEvent instanceof NavigationEnd:
          case routerEvent instanceof NavigationCancel:
          case routerEvent instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      })
    }

    this.apiLoaderService.isLoading.subscribe((v: boolean) => {
      this.isLoading = v;
    })

    if (isPlatformBrowser(this.platformId)) {
      this.setDarkLightModeClass();
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  changeMode(event) {
    this.applicationViewMode = event === 'dark' ? 'darkClass' : 'lightClass';
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkLightModeClass', this.applicationViewMode);
      this.setDarkLightModeClass();
    }
  }

  setDarkLightModeClass() {
    let darkLightMode = localStorage.getItem('darkLightModeClass');
    if (!darkLightMode) {
      localStorage.setItem('darkLightModeClass', 'lightClass');
      darkLightMode = 'lightClass';
    }
    const bodyElement = document.body;
    bodyElement.classList.remove('lightClass', 'darkClass');
    bodyElement.classList.add(darkLightMode);
  }

  subscribeToUtilityStore() {
    this.store.select(selectUtilityState).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(utilityState => {

      // NOT FETCHED YET SO FETCH ONCE
      if (utilityState.refetchBusinessPofiles) {
        this.store.dispatch(UtilityActions.clearBusinessProfile());
        this.store.dispatch(UtilityActions.fetchMemberBusinessProfiles());
        this.store.dispatch(UtilityActions.fetchBusinessProfile({
          status: 'UNVERIFIED'
        }));
      }

      // CHECK FOR THE RESULTS AND PUSH IF THERE
      if (utilityState.businessProfiles && utilityState.businessFetchSuccess) {
        const activeBusiness: FirebaseBusinessClaims[] = [];

        utilityState.businessProfiles.forEach(business => {
          activeBusiness.push({
            businessId: business.businessId,
            businessRole: business.businessRole,
            active: business.verified ? business.verified : true,
            logo: business.logoUrl,
            name: business.businessName,
            color: '',
            activated: false,
          })
        });

        this.authService.setFirebaseClaimForUser('OWNER', true, activeBusiness);
      } else if (utilityState.businessProfiles === null && utilityState.businessFetchSuccess) {
        // GOT EMPTY RESPONSE
        this.authService.deactivateBusinessMode();
      }
    })
  }

  refetchHomePageSections(action: string = 'LOGOUT') {
    if (action === 'LOGOUT') {
      this.authService.setRefreshHomePageWatcher(false);
    } else {
      this.authService.setRefreshHomePageWatcher(true);
    }

    // dispatch actions
    /****
      this.store.dispatch(
        UtilityActions.getOffersMatchBox()
      );
     */
  }

  checkIsBrowser(){
    return isPlatformBrowser(this.platformId);
  }
}
