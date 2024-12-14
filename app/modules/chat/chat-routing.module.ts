import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ChatMsgWebComponent } from './components/chat/chat-msg-web/chat-msg-web.component';
import { ChatOfferDealWebComponent } from './components/chat/chat-offer-deal-web/chat-offer-deal-web.component';
import { ChatUserListWebComponent } from './components/chat/chat-user-list-web/chat-user-list-web.component';

import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  { 
    path: '', 
    component: ChatComponent,
    canLoad: [AuthGuard]
  },
  { 
    path: 'offer-deal', 
    component: ChatOfferDealWebComponent, 
    canLoad: [AuthGuard]
  },
  { 
    path: 'offers/:oid/users', 
    component: ChatUserListWebComponent,
    canLoad: [AuthGuard] 
  },
  { 
    path: ':type/:oid/rooms/:rid/messages', 
    component: ChatMsgWebComponent,
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule { }
