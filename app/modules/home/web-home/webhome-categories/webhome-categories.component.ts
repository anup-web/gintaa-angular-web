import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { HomeDataService } from '../../services/home-data.service';
import { AuthService } from '@gintaa/core/services/auth.service';
import { Router } from '@angular/router';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-webhome-categories',
  templateUrl: './webhome-categories.component.html',
  styleUrls: ['./webhome-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebhomeCategoriesComponent implements OnInit {

  private componentDestroyed$: Subject<void> = new Subject<void>();
  matchboxLoaded: boolean = false;
  matchboxLoadedCalled: boolean = false;
  allPopularCategories$: Observable<any[]>;
  allPopularProductCategories$: Observable<any[]>;
  allPopularServiceCategories$: Observable<any[]>;
  offerNoImage: string = 'assets/images/no-image.png';
  @Input('allPopularCategories') allCategories: any;
  @Input('isLoggedIn') isLoggedIn: boolean = false;
  @Input('buyNewProductData') buyNewProductData: any;
  @Input('appPromotionalBanner') appPromotionalBanner: any;
  allMatchesOffer: any = [];
  subscription: Subscription;
  subscriptionauth: Subscription;
  subscriptionMatchBox: Subscription;
  authState:boolean = false;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private homeDataService: HomeDataService) { }

  ngOnInit(): void {
    this.allPopularCategories$ = this.homeDataService.getPopularCategories({});
    this.allPopularProductCategories$ = this.allPopularCategories$
      .pipe(
        map(categories => categories
          .filter(category => category.type && category.type.toLowerCase() === 'item')
        )
      );

    this.allPopularServiceCategories$ = this.allPopularCategories$
      .pipe(
        map(categories => categories
          .filter(category => category.type && category.type.toLowerCase() === 'service'))
      );

    this.subscriptionauth = this.authService.getFirebaseLoginStatus().subscribe(data => {
      this.authState = data;
      if (!data && this.matchboxLoadedCalled) {
        this.clearMatchBox();
      }
    });
    this.subscription = this.authService.refreshHomePageWatcher$.subscribe(data => {
      if (data) {
        this.subscriveMatchBox();
      }
    });
  }
  subscriveMatchBox() {
    this.subscriptionMatchBox = this.store.select(selectUtilityState).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(utilityState => {
      if(this.authService.isAuthenticated()){
        this.matchboxLoadedCalled = utilityState.matchBoxLoaded
        if (utilityState.matchBoxLoaded) {
          this.allMatchesOffer = utilityState.offersMatchBox;
          this.changeDetectorRef.detectChanges();
        } else {
          this.fetchMatchBox();
        }
      }
    });
  }

  ngOnDestroy() {
    try {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscriptionauth.unsubscribe();
      }
      this.subscriptionMatchBox.unsubscribe();
      this.componentDestroyed$.next();
      this.componentDestroyed$.complete();
    } catch (e) { }
  }

  clearMatchBox() {
    this.store.dispatch(
      UtilityActions.clearOffersMatchBox()
    );
  }

  fetchMatchBox() {
    this.matchboxLoaded = true;
    this.store.dispatch(
      UtilityActions.getOffersMatchBox()
    );
  }

  navigateToCategoryPage(text: string) {
    text ?
      this.router.navigate(['/category'], {
        queryParams: {
          searchText: text
        }
      })
      : this.router.navigate(['/category']);
  }

  showAll() {
    this.router.navigate(['/show-all-offer/'], { queryParams: { 'type': 'popularCategories' } });
  }

  redirectToQueryUrl(item: any) {
    if(item && item['queryUrl'] && item['queryUrl'] != "") {
      let queryUrl = item['queryUrl'];
      if(item['searchText'] && item['searchText'] != "") {
        this.router.navigate([queryUrl], {queryParams: { searchText: item['searchText'] }} );
      } else {
        this.router.navigate([queryUrl]);
      }
      
    }
  }
}
