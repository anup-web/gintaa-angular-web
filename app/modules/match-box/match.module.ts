import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@gintaa/core/core.module';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { FloatingListingModule } from '@gintaa/shared/components/floating-listing/floating-listing.module';
import { FloatingMenuModule } from '@gintaa/shared/components/floating-menu/floating-menu.module';
import { OfferCardDefaultModule } from '@gintaa/shared/components/offer-card-default/offer-card-default.module';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatchBoxComponent } from './components/match-box/match-box.component';
import { MatchExistingOffersComponent } from './components/match-box/match-existing-offers/match-existing-offers.component';
import { MatchPotentialOffersComponent } from './components/match-box/match-potential-offers/match-potential-offers.component';
import { MatchRoutingModule } from './match-routing.module';
import { MatchBoxEffects } from './store/matchbox.effects';
import { matchBoxReducer } from './store/matchbox.reducer';
@NgModule({
  declarations: [    
    MatchBoxComponent, 
    MatchExistingOffersComponent, 
    MatchPotentialOffersComponent, 
],
  imports: [
    CommonModule,
    MatchRoutingModule,
    CoreModule,
    PipesModule,
    BreadCrumbModule,
    FloatingListingModule,
    FloatingMenuModule,
    OfferCardDefaultModule,
    StoreModule.forFeature('matchbox', matchBoxReducer),
    EffectsModule.forFeature([MatchBoxEffects]),
  ]
})
export class MatchModule { }
