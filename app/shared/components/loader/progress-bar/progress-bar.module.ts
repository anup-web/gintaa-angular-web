import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    ProgressBarComponent
  ]
})
export class ProgressBarModule { }
