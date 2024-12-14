import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatModule } from '@gintaa/modules/chat/chat.module';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxScrollTopModule,
    ChatModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
