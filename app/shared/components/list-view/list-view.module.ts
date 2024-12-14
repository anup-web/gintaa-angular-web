import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListViewComponent } from './list-view.component';

@NgModule({
  declarations: [
    ListViewComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    PipesModule,
  ],
  exports: [
    ListViewComponent,
  ]
})
export class ListViewModule { }
