import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ChatCurrentTabEnums } from '@gintaa/shared/models';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';

@Component({
  selector: 'app-chat-offer-deal',
  templateUrl: './chat-offer-deal.component.html',
  styleUrls: ['./chat-offer-deal.component.scss']
})
export class ChatOfferDealComponent implements OnInit {

  @Input('chatType') chatType: string;
  @Input('screenType') screenType: string;
  chatTabTypeEnums = ChatCurrentTabEnums;
  currTab: ChatCurrentTabEnums;
  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.currTab = this.chatService.currentTab;
    console.log(this.chatService.currentTab);
  }

  currentTab(tab: ChatCurrentTabEnums){
    this.currTab = this.chatService.currentTab = tab;
  }

}
