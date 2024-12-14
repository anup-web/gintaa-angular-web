import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { Observable, Subscription } from 'rxjs';
import { ChatMessageTypeEnums, chatOfferMessage, chatOfferRoom, ChatTypeEnums, UserOnlineStatus } from '@gintaa/shared/models';


@Component({
  selector: 'app-chat-user-list-web',
  templateUrl: './chat-user-list-web.component.html',
  styleUrls: ['./chat-user-list-web.component.scss']
})
export class ChatUserListWebComponent implements OnInit {
  currentUser: any;

  public offerDetName : string;
  public chtType      : string;
  eventService: any;
  constructor(public chatService: ChatService) {
    
   }

  breadcrumb: any[] = [];
  lastViewedOffer$: Observable<any>;
  offerId :string;
 
  ngOnInit(): void {

    setTimeout(() => {
      // console.log("=================",this.chatService?.offerDetail?.name,this.chatService?.chatType);
      this.getBreadcumbObj(this.chatService?.offerDetail?.name,this.chatService?.chatType);
    }, 500);

  }

  getBreadcumbObj(oferDetname:string ,chatType:string){
    // console.log("========",oferDetname,chatType);

    if(chatType === 'offer'){
      this.breadcrumb = [{
        name: 'Trading Chat',
        link: '/chat/offer-deal',
        show: true,
        click: false,
      },{
        name: oferDetname?.length>15? oferDetname?.substr(0,14)+'....' : oferDetname,
        show: true,
        click: false,
      }];
    }else{
      this.breadcrumb = [{
        name: 'Trading Chat',
        link: '/chat/offer-deal',
        show: true,
        click: false,
      }];
    }
    
  }



}
