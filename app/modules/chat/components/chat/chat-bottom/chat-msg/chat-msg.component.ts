import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '@gintaa/modules/profile/services/profile.service';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent implements OnInit {

  @ViewChild('myScrollContainer') myScrollContainer: ElementRef;
  @Input('screenType') screenType: string;
  @Input('chatType') chatType: string; 

  recipientId:string;

  constructor(private chatService: ChatService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    // console.log(this.screenType);
    this.chatService.chatHistorySubject$.subscribe((messages)=>{
      setTimeout(()=>{
        this.scrollToBottom();
      },0)
    })
    this.chatService.isChatConnected.subscribe((res)=>{
      this.recipientId = this.chatService.chatConnect.recipientId;
      this.checkAllStatus();
    })
  }

  onScrollDown() {
    // console.log('scrolled down!!');
  }
 
  onScrollUp() {
    // console.log('scrolled up!!');
    this.chatService.chatScrollUp.next('up');
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(error) { 
      // console.log(error);
    }                 
  }

  checkAllStatus(){
    this.profileService.checkAlreadyCallerHasReportedUser(this.recipientId)
      .subscribe((res: any) => {
        // console.log(res);
        this.chatService.loggedInUserAllStatus.alreadyReportedOtherUser = res.payload;
      }, (err)=>{
        // console.log(err); 
    })

    this.profileService.checkAlreadyCallerHasBlockedUser(this.recipientId)
      .subscribe((res: any) => {
        // console.log(res);
        this.chatService.loggedInUserAllStatus.alreadyCallerHasBlockUser = res.payload;
      }, (err)=>{
        // console.log(err); 
    })

    this.profileService.checkAlreadyCallerIsBlockedByUser(this.recipientId)
      .subscribe((res: any) => {
        // console.log(res);
        this.chatService.loggedInUserAllStatus.alreadyCallerIsBlockedByUser = res.payload;
      }, (err)=>{
        // console.log(err); 
    })

    this.profileService.checkAlreadyBlockByEachOther(this.recipientId)
      .subscribe((res: any) => {
        // console.log(res);
        this.chatService.loggedInUserAllStatus.alreadyBothBlocked = res.payload;
      }, (err)=>{
        // console.log(err); 
    })
  }

}
