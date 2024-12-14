import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { MediaSpinnerComponent } from './media-spinner.component';


@NgModule({
  declarations: [
    MediaSpinnerComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  exports: [
    MediaSpinnerComponent,
  ]
})
export class MediaSpinnerModule { }
