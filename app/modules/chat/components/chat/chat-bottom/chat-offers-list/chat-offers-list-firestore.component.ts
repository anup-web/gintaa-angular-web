import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { OfferService } from '@gintaa/shared/services';
import { ChatMessageTypeEnums, chatOfferMessage, chatOfferRoom, chatOngoingOfferCommunication, ChatTypeEnums, UserOnlineStatus } from '@gintaa/shared/models';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '@gintaa/core/services';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { StorageService } from '@gintaa/core/services/storage.service';
@Component({
  selector: 'app-chat-offers-list',
  templateUrl: './chat-offers-list.component.html',
  styleUrls: ['./chat-offers-list.component.scss']
})
export class ChatOffersListComponent implements OnInit {
  page: number = 0;
  defaultLimit: number = 100;
  showLimit: number;
  allOfferCommunications: Array<chatOngoingOfferCommunication>;
  noImage: string = defaultNoImage;
  allFixedData = [];
  @Input('chatType') chatType: string;
  @Input('screenType') screenType: string;
  isLoading: boolean = true;
  userStatus$: Subscription; 
  subcriptionStopNotifier = new Subject();
  loggedInBusinessId: string;
  constructor(private chatService: ChatService,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private offerService: OfferService,
    private authService: AuthService,
    private firebaseAuthService: FirebaseAuthService,
    private storageService: StorageService) { 
    this.showLimit = this.defaultLimit;
  }

  ngOnInit(): void {
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
    this.userStatus$ = this.chatService
        .setOfflineOnlineStatus(UserOnlineStatus.online)
        .subscribe((res)=>{
            console.log(res);
          }, (error) => {
            console.log(error); 
          });
    this.ongoingOfferCommunications();
  }

  ongoingOfferCommunications() {
    const page = this.page;
    const size = this.showLimit;
    // chat firestore
    this.chatService.getOngoingChatCommunications(ChatTypeEnums.offer,{page, size})
      .pipe(
        takeUntil(this.subcriptionStopNotifier)
      )
      .subscribe((response: Array<chatOngoingOfferCommunication>) => {
        this.isLoading = false;
        this.allOfferCommunications = response;
        this.allFixedData = this.allOfferCommunications = [...new Set(this.allOfferCommunications as any)] as any
        //this.allOfferCommunications.map((offer: chatOngoingOfferCommunication)=>{
        for(let i=0;i<this.allOfferCommunications.length;i++){
          // offer.totalUnReadMsgCount = 0;
          // offer.lasMessage = '';
          const offer = this.allOfferCommunications[i];
          this.chatService.getAllChatRooms({
            entityId: offer.id,
            chatType: ChatTypeEnums.offer
          })
          .pipe(
            takeUntil(this.subcriptionStopNotifier)
          )
          .subscribe(
           (rooms: Array<chatOfferRoom>)=>{
             if(rooms.length === 0){
               this.allOfferCommunications.splice(i,1);
             } else {
                rooms = rooms.filter((room: chatOfferRoom)=>{
                  if(this.checkIsItLoggedInUser(room.chatInitiatorDetails.identityId) || this.checkIsItLoggedInUser(room.offerOwnerDetails.identityId)){
                    return true;
                  }
                })
                rooms.map((room: chatOfferRoom)=>{
                  this.chatService.getRoomUnreadCount({
                    enitityId: offer.id,
                    roomId: room.id,
                    chatType: ChatTypeEnums.offer,
                  })
                  .pipe(
                    takeUntil(this.subcriptionStopNotifier)
                  )
                  .subscribe((messages)=>{
                      room.totalUnReadMsgCount = messages.length;
                      setTimeout(()=>{
                        offer.totalUnReadMsgCount = rooms.reduce((a,b)=> {
                          return  b.totalUnReadMsgCount? a + b.totalUnReadMsgCount : a + 0;
                        },0)
                        const totalOfferUnreadCount = this.allOfferCommunications.reduce((a,b)=> {
                          return  b.totalUnReadMsgCount? a + b.totalUnReadMsgCount : a + 0;
                        },0)
                        this.chatService.setUnreadCount(ChatTypeEnums.offer,totalOfferUnreadCount);
                        this.isLoading = false;
                      },200)
                  },error => {
                    this.isLoading = false;
                    // console.log(error);
                  })

                  this.chatService.getChatMessagesByRoomId({
                    entityId: offer.id, 
                    roomId:room.id, 
                    chatType: ChatTypeEnums.offer,
                    //limit: 1
                  })
                  .pipe(
                      takeUntil(this.subcriptionStopNotifier)
                    )
                  .subscribe(
                    (res: Array<chatOfferMessage>)=>{
                        //res.sort((a: any,b: any)=> (a.messageTime < b.messageTime) ? 1 : ((a.messageTime > b.messageTime) ? -1 : 0));
                        res = res.filter((item)=> this.isMessageAvailable(item));
                        if(res.length>0){
                          room.lastMessage = this.getLastMessage(res[0]);
                          room.fromName = this.getUserName(res,room);
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
                            offer.lastMessage = rooms[0].lastMessage;
                            offer.fromName = rooms[0].fromName
                            offer.lastMessageTime = rooms[0].lastMessageTime;
                            offer.lastMessageSenderIsLoginUser = rooms[0].lastMessageSenderIsLoginUser;
                            offer.lastMessageIsSent = rooms[0].lastMessageIsSent;
                            offer.lastMessageIsDelivered = rooms[0].lastMessageIsDelivered;
                            offer.lastMessageIsRead = rooms[0].lastMessageIsRead;
                            this.allOfferCommunications.sort((firestE: any, secondE: any)=>{
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
                      this.isLoading = false;
                      //console.log(this.allRooms);  
                    }
                  )
                  })
             }
           },error => {
             this.isLoading = false;
            //  console.log(error);
           }, () => {
             this.isLoading = false;
            //  console.log(this.allOfferCommunications);  
           }
         )
       //}) 
       }
      }, error =>{
        this.isLoading = false;
        // console.log(error);
      })
  }
  

  showTime(utcDateTime: string){
    if(utcDateTime){
      const locatDateTime = moment.utc(utcDateTime).toDate();
      const localTime = moment(locatDateTime).format('hh:mm a'); 
      return localTime;
    }
  }

  getOfferUsersOrOpenChat(ongoingOffer: any){
    // chat with firestore
      const offerId = ongoingOffer.offerId || ongoingOffer.id;
      this.offerService.getOfferDetail(offerId)
      .pipe(
        takeUntil(this.subcriptionStopNotifier)
      )
      .subscribe((res: any)=>{
       const offerDetail = res.payload;
       this.chatService.chatOfferId = offerId;
       this.chatService.chatType = ChatTypeEnums.offer;
       //check current user is offer owner or not..
        if(this.chatService.isOfferOwner(offerDetail.user && offerDetail.user.identityId)){
          if(this.chatType === 'popup')
          this.chatService.changeChatPoppupPage({
            chatPageType: 'chat-user-list',
            chatType: ChatTypeEnums.offer,
            entityId: offerId
          });
          else 
          this.router.navigateByUrl(`chat/offers/${offerId}/users`);
        } else {
          this.createRoom(offerDetail)
        }
      })
     
  }

  createRoom(offer){
    this.chatService.createRoom(offer,ChatTypeEnums.offer)
    .pipe(
      takeUntil(this.subcriptionStopNotifier)
    )
    .subscribe((res: any)=> {
      const response: any = res;
      if(this.chatType === 'popup')
      this.chatService.changeChatPoppupPage({
        chatPageType: 'chat-msg',
        chatType: ChatTypeEnums.offer,
        entityId: offer.offerId,
        roomId: response.roomId
      });
      else 
      this.router.navigateByUrl(`chat/${ChatTypeEnums.offer}/${offer.offerId}/rooms/${response.roomId}/messages`); 
    },(error)=>{
      // console.log({message:error});
    });
  }

  filterOffers(event){
    const searchText = event.value;
    if(event.value && event.value.length>0){
      this.allOfferCommunications = this.allFixedData.filter((item)=>{
          return item.offerDetails?.offerName.toLowerCase().indexOf(searchText.toLowerCase())>-1
      })
    } else {
      this.allOfferCommunications = this.allFixedData;
    }
    // console.log(this.allOfferCommunications);
    // console.log(this.allFixedData);
  }

  onScrollDown(){
    // console.log('scrolled down!!');
  }

  onScroll(){
    // console.log('scrolled!!');
    this.showLimit +=this.defaultLimit;
    this.ongoingOfferCommunications();
  }

  initializer(){
    this.subcriptionStopNotifier.next();
    this.subcriptionStopNotifier.complete();
    this.allOfferCommunications = [];
  }

  ngOnDestroy(){
    this.initializer();
    if(this. userStatus$)
    this.userStatus$.unsubscribe();
  }

  getLastMessage(message: chatOfferMessage): string {
    message.messageBody = message.messageBody.length > 90
                          ? `${message.messageBody.substring(0,90)}...`
                          : message.messageBody
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

  isMessageAvailable(msg: chatOfferMessage | any): boolean {
    let res = true;
    if(msg.deletedForMe){
      if(this.checkIsItLoggedInUser(msg.deletedForMe, true)> -1){
        res = false;
      }
    }
    return res;
  }

  getUserName(res,room){
    const name = res[0].senderId === room.chatInitiatorDetails.identityId 
                          ?(
                            this.checkIsItLoggedInUser(room.chatInitiatorDetails.identityId)
                            ? 'You'
                            : room.chatInitiatorDetails?.name
                          )
                          :(
                            this.checkIsItLoggedInUser(room.offerOwnerDetails.identityId)
                            ? 'You'
                            : room.offerOwnerDetails?.name
                          );
    return name;                    
  }

  checkIsItLoggedInUser(userId, shouldFindInArray: boolean = false){
    if(shouldFindInArray){
      return userId.indexOf(this.authService.currentUserId) || userId.indexOf(this.loggedInBusinessId);
    } else {
      return this.authService.currentUserId === userId || this.loggedInBusinessId === userId;
    }
   
  }

  clickOnTitleOrImage(offerId,event){
    if(offerId){
      this.router.navigateByUrl(`offer/${offerId}`);
      event.stopPropagation();
    }
  }

}
