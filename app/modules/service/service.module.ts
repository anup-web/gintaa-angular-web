import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateOfferPrimaryInfoModule } from '@gintaa/shared/features/create-offer-primary-info/create-offer-primary-info.module';
import { CreateOfferTipsModule } from '@gintaa/shared/features/create-offer-tips/create-offer-tips.module';
import { DocumentUploadModule } from '@gintaa/shared/features/document-upload';
import { MediaUploadModule } from '@gintaa/shared/features/media-upload';
import { PostOfferModule } from '@gintaa/shared/features/post-offer/post-offer.module';
import {
  ServiceComponent
} from './';
import { ServiceRoutingModule } from './service-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServiceRoutingModule, 
    MediaUploadModule,
    PostOfferModule,
    DocumentUploadModule,
    CreateOfferPrimaryInfoModule,
    CreateOfferTipsModule
  ],
  declarations: [
    ServiceComponent
  ]
})
export class ServiceModule { }
