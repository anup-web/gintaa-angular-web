import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '@gintaa/core/services';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { StorageService } from '@gintaa/core/services/storage.service';
import { DealDetailsFormat } from '@gintaa/modules/deal-new/models/deal.model';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import { DeafaultChatProfiletNoImage, defaultNoImage } from '@gintaa/shared/configs/default.config';
import { chatDealMessage, chatDealRoom, ChatMessageTypeEnums, chatOngoingDealCommunication, ChatTypeEnums, UserOnlineStatus } from '@gintaa/shared/models';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chat-deals-list',
  templateUrl: './chat-deals-list.component.html',
  styleUrls: ['./chat-deals-list.component.scss']
})
export class ChatDealsListComponent implements OnInit {

  page: number = 0;
  defaultLimit: number = 100;
  showLimit: number;
  allCommunications: Array<chatOngoingDealCommunication>;
  noImage: string = defaultNoImage;
  allFixedData = [];
  @Input('chatType') chatType: string;
  @Input('screenType') screenType: string;
  subcriptionStopNotifier = new Subject();
  loggedInId: string;
  isLoading: boolean = true;
  noChatProfileImage: string = DeafaultChatProfiletNoImage.dealSection;
  loggedInBusinessId: string;
  constructor(private chatService: ChatService,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private dealService: DealService,
    private authService: AuthService,
    private firebaseAuthService: FirebaseAuthService,
    private storageService: StorageService) { 
  }

  ngOnInit(): void {
    this.showLimit = this.defaultLimit;
    this.loggedInId = this.authService.currentUserId;
    // console.log(this.screenType);
    if(this.authService.isLoggedIn){
      this.callFirestoreApis();
    } else {
      this.fireAuth.onAuthStateChanged((user)=>{
        if(user){
          this.callFirestoreApis();
        }else{
          //console.log('hh')
        }
      })
    }
  }

  callFirestoreApis(){
    let loggedInBusinessDetails: any = this.storageService.getSelectedBusiness();
    this.loggedInBusinessId = loggedInBusinessDetails?.businessId;
    this.ongoingCommunications();
  }

  ongoingCommunications() {
    const page = this.page;
    const size = this.showLimit;
    // chat firestore
    this.chatService.getOngoingDealChatCommunications(ChatTypeEnums.deal,{page, size})
      .pipe(
        takeUntil(this.subcriptionStopNotifier)
      )
      .subscribe((response: Array<chatOngoingDealCommunication>) => {
        this.isLoading = false;
        this.allCommunications = response;
        this.allFixedData = this.allCommunications = [...new Set(this.allCommunications as any)] as any
        for(let i=0;i<this.allCommunications.length;i++){
          if(!this.allCommunications[i].sender || (this.allCommunications[i].sender && Object.keys(this.allCommunications[i].sender).length === 0)){
            this.allCommunications.splice(i,1);
            i= i-1;
            continue;
          }
          const deal: chatOngoingDealCommunication = this.allCommunications[i];
          const otherUserId = this.showOtherUserId(deal);
          this.chatService.getOfflineOnlineStatus(otherUserId).subscribe((statusRes)=>{
            this.allCommunications[i].status = statusRes?.state || UserOnlineStatus.offline;
         })
          this.chatService.getAllChatRooms({
            entityId: deal.id,
            chatType: ChatTypeEnums.deal
          })
          .pipe(
            takeUntil(this.subcriptionStopNotifier)
          )
          .subscribe(
           (rooms: Array<chatDealRoom>)=>{
            if(rooms.length === 0){
              this.allCommunications.splice(i,1);
            } else {
              rooms = rooms.filter((room: chatDealRoom)=>{
                if(this.checkIsItLoggedInUser(room.chatInitiatorDetails.identityId) || this.checkIsItLoggedInUser(room.chatReceiverDetails.identityId)){
                  return true;
                }
              })
                rooms.map((room: chatDealRoom)=>{
                  this.chatService.getRoomUnreadCount({
                    enitityId: deal.id,
                    roomId: room.id,
                    chatType: ChatTypeEnums.deal,
                  })
                  .pipe(
                    takeUntil(this.subcriptionStopNotifier)
                  )
                  .subscribe((messages)=>{
                      room.totalUnReadMsgCount = messages.length;
                      setTimeout(()=>{
                        deal.totalUnReadMsgCount = rooms.reduce((a,b)=> {
                          return  b.totalUnReadMsgCount? a + b.totalUnReadMsgCount : a + 0;
                        },0)
                        const totalMsgUnreadCount = this.allCommunications.reduce((a,b)=> {
                          return  b.totalUnReadMsgCount? a + b.totalUnReadMsgCount : a + 0;
                        },0)
                        this.chatService.setUnreadCount(ChatTypeEnums.deal,totalMsgUnreadCount);
                      },200)
                  },error => {
                    this.isLoading = false;
                    // console.log(error);
                  })

                  this.chatService.getChatMessagesByRoomId({
                    entityId: deal.id, 
                    roomId:room.id, 
                    chatType: ChatTypeEnums.deal,
                    //limit: 1
                  })
                  .pipe(
                      takeUntil(this.subcriptionStopNotifier)
                    )
                  .subscribe(
                    (res: Array<chatDealMessage>)=>{
                        //res.sort((a: any,b: any)=> (a.messageTime < b.messageTime) ? 1 : ((a.messageTime > b.messageTime) ? -1 : 0));
                        res = res.filter((item)=> this.isMessageAvailable(item));
                        if(res.length>0){
                          room.lastMessage = this.getLastMessage(res[0]);
                          // room.fromName = room.chatReceiverDetails?.identityId === this.authService.    currentUserId 
                          // ?room.chatInitiatorDetails?.name
                          // :room.chatReceiverDetails?.name;
                          room.lastMessageTime = res[0].messageTime;
                          room.lastMessageSenderIsLoginUser = this.checkIsItLoggedInUser(res[0].senderId);
                          room.lastMessageIsSent = res[0].isSent;
                          room.lastMessageIsDelivered = res[0].isDelivered;
                          room.lastMessageIsRead = res[0].isRead;
                        }
                        if(rooms.length>0){
                          setTimeout(()=>{
                            rooms.sort((firestE: any,secondE: any)=> {
                              if(!firestE.lastMessageTime && secondE.lastMessageTime){
                                return 1;
                              } else if(firestE.lastMessageTime && !secondE.lastMessageTime){
                                return -1;
                              } else if(!firestE.lastMessageTime && !secondE.lastMessageTime){
                                return -1;
                              } 
                              if(secondE.lastMessageTime > firestE.lastMessageTime){
                                return 1;
                              } else if (firestE.lastMessageTime > secondE.lastMessageTime){
                                return -1;
                              } else {
                                return 0;
                              }
                            });
                            deal.lastMessage = rooms[0].lastMessage;
                            //deal.fromName = rooms[0].fromName
                            deal.lastMessageTime = rooms[0].lastMessageTime;
                            deal.lastMessageSenderIsLoginUser = rooms[0].lastMessageSenderIsLoginUser;
                            deal.lastMessageIsSent = rooms[0].lastMessageIsSent;
                            deal.lastMessageIsDelivered = rooms[0].lastMessageIsDelivered;
                            deal.lastMessageIsRead = rooms[0].lastMessageIsRead;
                            this.allCommunications.sort((firestE: any, secondE: any)=>{
                              if(!firestE.lastMessageTime && secondE.lastMessageTime){
                                return 1;
                              } else if(firestE.lastMessageTime && !secondE.lastMessageTime){
                                return -1;
                              } else if(!firestE.lastMessageTime && !secondE.lastMessageTime){
                                return -1;
                              } 
                              if(secondE.lastMessageTime > firestE.lastMessageTime){
                                return 1;
                              } else if (firestE.lastMessageTime > secondE.lastMessageTime){
                                return -1;
                              } else {
                                return 0;
                              }
                            })
                          },200)
                        }
                        
                    },error => {
                      this.isLoading = false;
                      // console.log(error);
                    }, () => {
                      // console.log(this.allRooms);  
                    }
                  )
                  })
            }
           },error => {
            this.isLoading = false;
            //  console.log(error);
           }, () => {
            this.isLoading = false;
            //  console.log(this.allCommunications);  
           }
         )
        }
      }, error =>{
        this.isLoading = false;
        // console.log(error);
      })
  }

  openChat(ongoingDeal: any){
    // chat with firestore
      const dealId = ongoingDeal.deal || ongoingDeal.id;
      this.dealService.getDealDetails(dealId)
      .pipe(
        takeUntil(this.subcriptionStopNotifier)
      )
      .subscribe((res: any)=>{
       const dealDetail: DealDetailsFormat = res.payload;
        this.createRoom(dealDetail);
      })
  }

  createRoom(deal: DealDetailsFormat){
    this.chatService.createRoom(deal,ChatTypeEnums.deal)
    .pipe(
      takeUntil(this.subcriptionStopNotifier)
    )
    .subscribe((res: any)=> {
      const response: any = res;
      if(this.chatType === 'popup')
      this.chatService.changeChatPoppupPage({
        chatPageType: 'chat-msg',
        chatType: ChatTypeEnums.deal,
        entityId: deal.dealRefId,
        roomId: response.roomId
      });
      else 
      this.router.navigateByUrl(`chat/${ChatTypeEnums.deal}/${deal.dealRefId}/rooms/${response.roomId}/messages`); 
    },(error)=>{
      // console.log({message:error});
    });
  }

  filterData(event){
    const searchText = event.value;
    if(event.value && event.value.length>0){
      this.allCommunications = this.allFixedData.filter((item: chatOngoingDealCommunication)=>{
        if(this.checkIsItLoggedInUser(item.receiver.identityId)){
          return item.sender?.name.toLowerCase().indexOf(searchText.toLowerCase())>-1
        } else if(this.checkIsItLoggedInUser(item.sender.identityId)){
          return item.receiver.name.toLowerCase().indexOf(searchText.toLowerCase())>-1
        }
      })
    } else {
      this.allCommunications = this.allFixedData;
    }
    // console.log(this.allCommunications);
    // console.log(this.allFixedData);
  }

  onScrollDown(){
    // console.log('scrolled down!!');
  }

  onScroll(){
    // console.log('scrolled!!');
    this.showLimit +=this.defaultLimit;
    this.ongoingCommunications();
  }

  showOtherUserId(chatDeal: chatOngoingDealCommunication){
    return this.loggedInId === chatDeal.receiver?.identityId
                               ? chatDeal.sender?.identityId || ''
                               : chatDeal.receiver?.identityId || ''
  }

  showOtherUserName(chatDeal: chatOngoingDealCommunication){
    return this.loggedInId === chatDeal.receiver?.identityId
                               ? chatDeal.sender?.name || ''
                               : chatDeal.receiver?.name || ''
  }

  showOtherUserImage(chatDeal: chatOngoingDealCommunication){
    return this.loggedInId === chatDeal.receiver?.identityId
                               ? chatDeal.sender?.imageUrl
                               : chatDeal.receiver?.imageUrl
  }

  // getDealCardHeaderFormattedName(chatDeal: chatOngoingDealCommunication) {
  //   let name = '';
  //   let date = new Date(chatDeal.dealSentTimeStamp);
  //   if (deal.callerIsReceiver) {
  //     name = deal.sender.name;
  //   } else {
  //     name = deal.receiver.name;
  //   }
  //   return `${name}, ${date.toDateString().split(' ')[1]} ${date.toDateString().split(' ')[2]}`;
  // }

  getLastMessage(message: chatDealMessage): string {
    if(message.messageType === ChatMessageTypeEnums.HTML){
      return ` ${message.messageBody}`;
    } else if(message.messageType === ChatMessageTypeEnums.IMAGE){
      const msg = message.messageBody || 'Photo';
      return `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5"> image </span> ${msg}`
    } else if(message.messageType === ChatMessageTypeEnums.VIDEO){
      const msg = message.messageBody || 'Video';
      return  `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      smart_display
      </span> ${msg}`
    } else if(message.messageType === ChatMessageTypeEnums.AUDIO){
      const msg = message.messageBody || 'Audio';
      return  `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      headphones
      </span> ${msg}`
    } else if(message.messageType === ChatMessageTypeEnums.FILE){
      const msg = message.messageBody || 'File';
      return  `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      article
      </span> ${msg}`
    } else if(message.messageType === ChatMessageTypeEnums.OFFER){
      const msg = message.messageBody || 'Offer';
      return  `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      local_offer
      </span> ${msg}`
    } else if (message.messageType === ChatMessageTypeEnums.AUDIO_RECORDING){
      const msg = message.messageBody || 'Record'
      return `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      mic</span> ${msg}`;
    }
  }

  initializer(){
    this.subcriptionStopNotifier.next();
    this.subcriptionStopNotifier.complete();
    this.allCommunications = [];
  }

  getUserStatusImg(status){
    if(status === UserOnlineStatus.online){
      return '/assets/images/user-status-online.png';
    } else {
      return  '/assets/images/user-status-offline.png';
    }
  }

  isMessageAvailable(msg: chatDealMessage | any): boolean {
    let res = true;
    if(msg.deletedForMe){
      if(this.checkIsItLoggedInUser(msg.deletedForMe,true)> -1){
        res = false;
      }
    }
    return res;
  }

  ngOnDestroy(){
    this.initializer();
  }

  checkIsItLoggedInUser(userId, shouldFindInArray: boolean = false){
    if(shouldFindInArray){
      return userId.indexOf(this.authService.currentUserId) || userId.indexOf(this.loggedInBusinessId);
    } else {
      return this.authService.currentUserId === userId || this.loggedInBusinessId === userId;
    }
   
  }

  clickOnTitleOrImage(dealId,event){
    if(dealId){
      this.router.navigateByUrl(`deals/details/${dealId}`);
      event.stopPropagation();
    }
  }
  

}
