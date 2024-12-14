import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from 'mat-timepicker';
import { ServiceTimingsNewComponent } from './service-timings.component';

@NgModule({
  declarations: [ServiceTimingsNewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTimepickerModule
  ],
  exports:[
    ServiceTimingsNewComponent
  ]
})
export class ServiceTimingsModule { }
