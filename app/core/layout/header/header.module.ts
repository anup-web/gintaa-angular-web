import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerModule } from '@gintaa/shared/components/loader/loader.module';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { HeaderComponent } from './header.component';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [
    HeaderComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    LoadingSpinnerModule,
    PipesModule,
    SearchModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
