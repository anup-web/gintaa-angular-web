import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MyBidsListComponent } from './components/my-bids-list/my-bids-list.component';
import { MyBidsSearchComponent } from './components/my-bids-search/my-bids-search.component';
import { MyBidsComponent } from './components/my-bids.component';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { FloatingListingModule } from '@gintaa/shared/components/floating-listing/floating-listing.module';
import { FloatingMenuModule } from '@gintaa/shared/components/floating-menu/floating-menu.module';
@NgModule({
  declarations: [
    MyBidsListComponent,
    MyBidsComponent,
    MyBidsSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyBidsComponent,
      }
    ]),
    InfiniteScrollModule,
    MatCheckboxModule,
    BreadCrumbModule,
    FloatingListingModule,
    FloatingMenuModule
  ]
})
export class MyBidsModule { }
