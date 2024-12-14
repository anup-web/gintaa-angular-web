import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsAllComponent } from './bread-crumbs-all.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadCrumbsAllComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BreadCrumbsAllComponent
  ]
})
export class BreadCrumbsAllModule { }
