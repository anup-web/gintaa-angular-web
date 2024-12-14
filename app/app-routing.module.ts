import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@gintaa/core/guards/auth.guard';
// import { BusinessAuthGuard } from '@gintaa/core/guards/business-auth.guard';

const routes: Routes = [
  {
    path: 'offer',
    loadChildren: () =>
      import("./modules/offer/offer.module").then(m => m.OfferModule)
  },
  {
     path: 'listing',
    loadChildren: () =>
      import("./modules/create-offer/create-offer.module").then(m => m.CreateOfferModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import("./modules/profile/profile.module").then(m => m.ProfileModule),
    canLoad: [AuthGuard]
  },

  {
    path: 'show-all',
    loadChildren: () =>
      import("./modules/offer/offer.module").then(m => m.OfferModule)
  },
  {
    path: 'my-listings',
    loadChildren: () =>
      import("./modules/my-offers/my-offers.module").then(m => m.MyOffersModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'my-bids',
    loadChildren: () =>
      import("./modules/my-bids/my-bids.module").then(m => m.MyBidsModule),
    // canLoad: [AuthGuard]
  },
  // {
   //   path: 'deals',
  //   loadChildren: () =>
  //     import("./modules/deal/deal.module").then(m => m.DealModule),
  //   canLoad: [AuthGuard]
  // },
  {
    path: 'deals',
    loadChildren: () =>
      import("./modules/deal-new/deal-new.module").then(m => m.DealNewModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () =>
      import("./modules/category/category.module").then(m => m.CategoryModule)
  },
  {
    path: 'chat',
    loadChildren: () =>
      import("./modules/chat/chat.module").then(m => m.ChatModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () =>
      import("./modules/settings/settings.module").then(m => m.SettingsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'legal',
    loadChildren: () =>
      import("./modules/footer-page/page.module").then(m => m.PageModule)
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import("./modules/my-favorites/favorites.module").then(m => m.FavoritesModule)
  },
  {
    path: 'business',
    loadChildren: () =>
      import("./modules/business/business.module").then(m => m.BusinessModule),
    // canLoad: [BusinessAuthGuard],
  },
  {
    path: 'pages',
    loadChildren: () =>
      import("./modules/footer-page/page.module").then(m => m.PageModule)
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import("./modules/wallet/wallet.module").then(m => m.WalletModule)
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import("./modules/wishlist/wishlist.module").then(m => m.WishlistModule),
  },
  {
    path: 'matches',
    loadChildren: () =>
      import("./modules/match-box/match.module").then(m => m.MatchModule)
  },

  {
    path: 'signin-email-link-verify',
    loadChildren: () =>
      import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'home/signin-email-link-verify',
    loadChildren: () =>
      import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'bulk-upload',
    loadChildren: () =>
      import("./modules/offer-bulk-upload/offer-bulk-upload.module").then(m => m.OfferBulkUploadModule)
  },
  {
    path: 'notification',
    loadChildren: () =>
      import("./modules/notification/notification.module").then(m => m.NotificationModule),
    canLoad: [AuthGuard]
  }, 
  {
    path: "",
    redirectTo: "/",
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
