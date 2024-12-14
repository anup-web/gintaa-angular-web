import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
@Component({
  selector: 'app-chat-msg-web',
  templateUrl: './chat-msg-web.component.html',
  styleUrls: ['./chat-msg-web.component.scss']
})
export class ChatMsgWebComponent implements OnInit {

  constructor(public chatService: ChatService) { 
  }

  breadcrumb: any[] = [];


  ngOnInit(): void {
    this.chatService.isChatConnected.subscribe((res)=>{
      this.getBreadcumbObj();
    })
  }

  getBreadcumbObj(){
    const oferDetname = this.chatService?.offerDetail?.name;
   // console.log("this.chatService.offerDetail?.currentUserOfferOwner",this.chatService.offerDetail?.currentUserOfferOwner,this.chatService?.chatConnect?.receipentName);
    if(this.chatService?.chatType == 'offer'){
      this.breadcrumb = [{
        name: 'Trading Chat',
        link: '/chat/offer-deal',
        show: true,
        click: false,
      },{
        name: oferDetname?.length>15? oferDetname?.substr(0,14)+'....' : oferDetname,
        show: true,
        link : this.chatService.offerDetail?.currentUserOfferOwner? `/chat/offers/${this.chatService.offerDetail.offerId}/users` : false,
        click: false,
      },
      {
        name: this.chatService?.chatConnect?.receipentName,
        show: true,
        click: false,
      }];
    }else{
      this.breadcrumb = [{
        name: 'Trading Chat',
        link: '/chat/offer-deal',
        show: true,
        click: false,
      },
      {
        name: this.chatService?.chatConnect?.receipentName,
        show: true,
        click: false,
      }];
    }

  }

}
