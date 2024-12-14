import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { MatVideoModule } from 'mat-video';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatAttachAudioComponent } from './components/chat/chat-bottom/chat-attach-audio/chat-attach-audio.component';
import { ChatAttachImageComponent } from './components/chat/chat-bottom/chat-attach-image/chat-attach-image.component';
import { ChatAttachOffersComponent } from './components/chat/chat-bottom/chat-attach-offers/chat-attach-offers.component';
import { ChatBottomSheetComponent } from './components/chat/chat-bottom/chat-bottom-sheet/chat-bottom-sheet.component';
import { ChatDealItemShowcaseComponent } from './components/chat/chat-bottom/chat-deal-item-showcase/chat-deal-item-showcase.component';
import { ChatDealsListComponent } from './components/chat/chat-bottom/chat-deals-list/chat-deals-list.component';
import { ChatMaximizePopupComponent } from './components/chat/chat-bottom/chat-maximize-popup/chat-maximize-popup.component';
import { ChatBodyComponent } from './components/chat/chat-bottom/chat-msg/chat-body/chat-body-firestore.component';
import { ChatFooterComponent } from './components/chat/chat-bottom/chat-msg/chat-footer/chat-footer-firestore.component';
import { ChatHeaderComponent } from './components/chat/chat-bottom/chat-msg/chat-header/chat-header.component';
import { ChatMsgComponent } from './components/chat/chat-bottom/chat-msg/chat-msg.component';
import { ChatOfferDealComponent } from './components/chat/chat-bottom/chat-offer-deal/chat-offer-deal.component';
import { ChatOffersListComponent } from './components/chat/chat-bottom/chat-offers-list/chat-offers-list-firestore.component';
import { ChatReportUserComponent } from './components/chat/chat-bottom/chat-report-user/chat-report-user.component';
import { ChatSelectedUsersComponent } from './components/chat/chat-bottom/chat-selected-users/chat-selected-users.component';
import { ChatSelectedUsersSendMsgComponent } from './components/chat/chat-bottom/chat-seletected-users-send-msg/chat-selected-users-send-msg.component';
import { ChatUserListComponent } from './components/chat/chat-bottom/chat-user-list/chat-user-list-firestore.component';
import { ChatMsgWebComponent } from './components/chat/chat-msg-web/chat-msg-web.component';
import { ChatOfferDealWebComponent } from './components/chat/chat-offer-deal-web/chat-offer-deal-web.component';
import { ChatUserListWebComponent } from './components/chat/chat-user-list-web/chat-user-list-web.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormatChatTimePipe } from './pipes/format-chat-time.pipe';



@NgModule({
  declarations: [
    ChatComponent,
    ChatMsgWebComponent,
    ChatOfferDealWebComponent,
    ChatUserListWebComponent,

    ChatAttachAudioComponent,
    ChatAttachImageComponent,
    ChatAttachOffersComponent,
    ChatBottomSheetComponent,
    ChatDealItemShowcaseComponent,
    ChatDealsListComponent,
    ChatMaximizePopupComponent,
    ChatMsgComponent,
    ChatHeaderComponent,
    ChatFooterComponent,
    ChatBodyComponent,
    ChatOfferDealComponent,
    ChatOffersListComponent,
    ChatReportUserComponent,
    ChatSelectedUsersComponent,
    ChatSelectedUsersSendMsgComponent,
    ChatUserListComponent,
    
    FormatChatTimePipe
    
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    InfiniteScrollModule,
    MatCheckboxModule,
    MatVideoModule,
    EmojiModule,
    PickerModule,
    BreadCrumbModule
  ],
  exports:[
    ChatBottomSheetComponent
  ]
})
export class ChatModule { }