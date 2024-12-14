import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFavoritesComponent } from './components/my-favorites/my-favorites.component';


const routes: Routes = [
 { path: '', component: MyFavoritesComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FavoritesRoutingModule { }
