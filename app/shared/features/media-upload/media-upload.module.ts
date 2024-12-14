import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaUploadComponent } from './media-upload.component';
import { MatVideoModule } from 'mat-video';
// import { NgxSpinnerModule } from "ngx-spinner";
// import { MediaSpinnerComponent } from '../media-spinner/media-spinner.component';
import { GetVideoTypePipe } from './pipes/get-video-type.pipe';
import { MediaSpinnerModule } from '../media-spinner/media-spinner.module';

@NgModule({
  declarations: [
    MediaUploadComponent,
    // MediaSpinnerComponent,
    GetVideoTypePipe
  ],
  imports: [
    CommonModule,
    MatVideoModule,
    // NgxSpinnerModule,
    MediaSpinnerModule
  ],
  exports: [
    MediaUploadComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class MediaUploadModule { }
