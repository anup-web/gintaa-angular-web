import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewModule } from '@gintaa/shared/components/list-view/list-view.module';
import { SeeAllOfferComponent } from './see-all-offer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SeeAllOfferComponent],
  imports: [
    CommonModule,    
    ListViewModule,
    RouterModule.forChild([
      { 
          path: '', 
          component: SeeAllOfferComponent
      }
    ]),
  ],
  exports: [
    SeeAllOfferComponent
  ]
})
export class SeeAllOfferModule { }
