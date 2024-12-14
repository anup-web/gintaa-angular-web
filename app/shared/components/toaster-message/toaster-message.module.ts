import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToasterMessageComponent } from './toaster-message.component';

@NgModule({
  declarations: [
    ToasterMessageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ToasterMessageComponent
  ]
})
export class ToasterMessageModule { }
