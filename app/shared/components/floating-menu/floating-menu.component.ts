import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnDestroy, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@gintaa/core/services';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { MyOfferService } from '@gintaa/modules/my-offers/services/my-offer.service';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { chatOfferRoom, chatOngoingOfferCommunication, ChatTypeEnums } from '@gintaa/shared/models';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { btnFadeInOut, fadeIn } from 'projects/gintaa/src/app/animation';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { FeatureListEnum } from '@gintaa/config/enum.config';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [btnFadeInOut, fadeIn]
})
export class FloatingMenuComponent implements OnInit, OnDestroy {
  public openMenu: boolean = false;
  isOver = false;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  latestDraftOfferId$: Observable<string>;
  draftOfferId: string = null;
  image: string = null;
  draftOfferConfig: any = {
    offerType: 'Item',
    page: 1,
    offset: 1,
  }

  offerUnreadCount: number = 0;
  dealUnreadCount: number = 0;

  releaseOffer: boolean = true; // offer = deal

  clickMenu() {
    this.openMenu = !this.openMenu;
  }

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private myOfferService: MyOfferService,
    public chatService: ChatService,
    private store: Store<gintaaApp.AppState>,
    private fireAuth: AngularFireAuth,
    private changeDetectorRef: ChangeDetectorRef,
    private staticContent: FirebaseStaticContentService,
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    // if(this.authService.isAuthenticated()) {
    //   console.log('Hhehehehheheheh');
    //   this.getLatestDraftOffer();
    // }
    
    this.latestDraftOfferId$ = this.store.select(selectUtilityState).pipe(
      map(res => res.latestDraftOffer.length ? res.latestDraftOffer[0].draftOfferId : null),
      takeUntil(this.componentDestroyed$),
    )
    this.authService.getFirebaseLoginStatus()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(data => {
        if (data) {
          this.getLatestDraftOffer();
        } else {
          this.clearLatestDraftOffer();
        }
      });


      this.chatService.unreadCountUpdate.subscribe((res)=>{
        this.changeDetectorRef.markForCheck();
        this.offerUnreadCount = res.offer;
        this.dealUnreadCount = res.deal;
      })
      
    this.isReleaseFeature();
  }

  async isReleaseFeature() {    
    this.releaseOffer = await this.staticContent.isFeatureRelease(FeatureListEnum.offer);
    // console.log('releaseOffer:', this.releaseOffer);
  }

  getLatestDraftOffer() {
    this.store.dispatch(UtilityActions.fetchLatestDraftOffer())
    // this.myOfferService.getUserDraftOffers(this.draftOfferConfig)
    // .pipe(
    //   // map(res => res.length ? res[0] : []),
    //   takeUntil(this.componentDestroyed$))
    //   .subscribe((res: Offer[]) => {
    //       if(res.length) {
    //         this.draftOfferId = res[0].draftOfferId;
    //         this.image = res[0].images.length ? res[0].images[0].url : null;
    //         this.draftOfferConfig.offerType = res[0].offerType; 
    //       }           
    //   });
  }

  clearLatestDraftOffer() {
    this.store.dispatch(
      UtilityActions.clearLatestDraftOffer()
    );
  }

  navigateToOffer(type: string) {
    // console.log("type",type);
    if (this.authService.isAuthenticated()) {
      const currentUser = this.authService.getSignInInput();
      if (currentUser && currentUser.username) {
        this.router.navigate(['/listing', type])
      } else {
        this.store.dispatch(AuthActions.redirectToPrifileName())
        this.openLoginDialog(type);
      }
    } else {
      this.clickMenu()
      this.openLoginDialog(type);

      if (isPlatformBrowser(this.platformId)) {
      //to redirect to create listing
        window.localStorage.setItem('fromCreateListingBtn','clicked');
      }
      // need to open login modal
    }
  }

  navigateToDraftOffer(id) {
    if(this.authService.isAuthenticated()) {
      this.router.navigate([`/listing/${this.draftOfferConfig.offerType.toLowerCase()}`], 
    { queryParams: { id }});
    } else {
      this.clickMenu()
      this.openLoginDialog('draft');
      // need to open login modal
    }
  }

  openLoginDialog(type: string) {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-login-component', true, false, 'auto', '906px');
    dialogConfig.position = {
      top: '20px',
    };
    dialogConfig.data = {};
    this.matDialog.open(LoginModalComponent, dialogConfig)
    .afterClosed().subscribe((results) => {
      // do something with results
      if(this.authService.isAuthenticated()) {
        if(type === 'draft') {
          this.router.navigate(
            [`/listing/${this.draftOfferConfig.offerType.toLowerCase()}`], 
            { queryParams: { id: this.draftOfferId }}
          );
        } else {
          this.router.navigate(['/listing', type])
        }        
      }
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated()
  }

  get isBusinessMode(): boolean {
    return this.authService.getIsBusinessMode();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  openChatWindow() {
    this.chatService.openChatWindow.next('open');
    setTimeout(() => {
      this.chatService.openChatWindow.next('chatWindowOpen');
    }, 1000);
  }

  closeChatWindow() {
    this.chatService.openChatWindow.next('close');
  }

}
