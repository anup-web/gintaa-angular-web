import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DocumentUploadComponent } from './document-upload.component';
@NgModule({
  declarations: [
    DocumentUploadComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule
  ],
  exports: [
    DocumentUploadComponent,
    NgxDropzoneModule
  ]
})
export class DocumentUploadModule { }
