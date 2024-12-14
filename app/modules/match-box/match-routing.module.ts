import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchBoxComponent } from './components/match-box/match-box.component';


const routes: Routes = [
 { path: '', component: MatchBoxComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MatchRoutingModule { }
