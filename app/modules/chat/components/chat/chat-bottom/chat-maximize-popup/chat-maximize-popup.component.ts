import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { chatModalUpDownSmooth } from 'projects/gintaa/src/app/animation';

@Component({
  selector: 'app-chat-maximize-popup',
  templateUrl: './chat-maximize-popup.component.html',
  styleUrls: ['./chat-maximize-popup.component.scss'],
  animations: [ chatModalUpDownSmooth ]
})
export class ChatMaximizePopupComponent implements OnInit {

  modalOpen = 'open';
  constructor(public dialogRef: MatDialogRef<ChatMaximizePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public chatService: ChatService) { }

  ngOnInit(): void {
  }

  close(type){
    // this.modalOpen = 'closed';
    this.dialogRef.close(type);
    // document.getElementsByClassName("animate__animated")[0].classList.remove("animate__slideInUp")
    //   document.getElementsByClassName("animate__animated")[0].classList.add("animate__slideOutDown");
    //   setTimeout(()=>{this.dialogRef.close(type)}, 500);
  }

  back(){
    if(this.chatService.chatPopupPage === 'chat-user-list'){
      this.chatService.changeChatPoppupPage({
        chatPageType: 'chat-offer-deal'
      });
    } else if(this.chatService.chatPopupPage === 'chat-msg'){
      if(this.chatService.chatConnect && this.chatService.chatConnect.isOfferOwner)
      this.chatService.changeChatPoppupPage({
        chatPageType: 'chat-user-list'
      });
      else
      this.chatService.changeChatPoppupPage({
        chatPageType: 'chat-offer-deal'
      });
    } 
    // if(this.chatService.chatPopupPage === 'chat-user-list'){
    //   this.chatService.changeChatPoppupPage('chat-offer-deal');
    // } else if(this.chatService.chatPopupPage === 'chat-msg'){
    //   if(this.chatService.chatConnect && this.chatService.chatConnect.isOfferOwner){
    //     this.chatService.changeChatPoppupPage('chat-user-list');
    //   } else {
    //     this.chatService.changeChatPoppupPage('chat-offer-deal');
    //   }
    // } 
  }

  changeModalType(type){
    this.chatService.changeChatModalType(type);
    this.close(type);
  }

}
