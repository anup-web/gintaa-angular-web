import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { darkTheme } from './core/theme/dark-theme';
import { lightTheme } from './core/theme/light-theme';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { ProgressBarModule } from './shared/components/loader/progress-bar/progress-bar.module';
import { ToasterMessageModule } from './shared/components/toaster-message/toaster-message.module';
import { gintaaReducer, metaReducers } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule.forRoot(),
    AuthModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(gintaaReducer, {
      metaReducers,
      runtimeChecks : {
        strictStateImmutability: true,
        strictActionImmutability: true,
        /*
          needed to make both the keys to false 
          otherwise firebase response which is not unserialized will not be stored in the redux store
          TODO: may be use observable/subects later to avoid this?
        */
        strictActionSerializability: false,
        strictStateSerializability:false
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    CoreModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    }),    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxSkeletonLoaderModule,
    ProgressBarModule,
    ToasterMessageModule,
    AngularFireAnalyticsModule
  ],
  providers: [{
    provide: REGION,
    useValue: 'asia-south1'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
