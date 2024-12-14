import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingMenuComponent } from './floating-menu.component';

@NgModule({
  declarations: [FloatingMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FloatingMenuComponent
  ]
})
export class FloatingMenuModule { }
