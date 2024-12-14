import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessBulkItemsComponent } from './components/business-bulk-items/business-bulk-items.component';


const routes: Routes = [
 { path: '', component: BusinessBulkItemsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OfferBulkUploadRoutingModule { }
