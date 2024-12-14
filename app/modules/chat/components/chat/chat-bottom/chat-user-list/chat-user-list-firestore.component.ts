import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, LoggerService } from '@gintaa/core/services';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { StorageService } from '@gintaa/core/services/storage.service';
import { DeafaultChatProfiletNoImage, defaultNoImage } from '@gintaa/shared/configs/default.config';
import { ChatMessageTypeEnums, chatOfferMessage, chatOfferRoom, ChatTypeEnums, UserOnlineStatus } from '@gintaa/shared/models';
import { OfferService } from '@gintaa/shared/services';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import moment from 'moment';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {

  offerDetail: any;
  offerId: any;
  noImage = DeafaultChatProfiletNoImage.userListSection;
  allRooms: Array<chatOfferRoom>;
  @Input('chatType') chatType: string;
  @Input('screenType') screenType: string;
  subcriptionStopNotifier= new Subject();
  isChatSelectedUserEnabled: boolean = false;
  isChatSelectedUserSendMsgEnabled: boolean = false;
  chatWithRooms: Array<chatOfferRoom>;
  isLoading: boolean = true;
  loggedInBusinessId: string;
  constructor(private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService,
    private firebaseAuthService: FirebaseAuthService,
    private authService: AuthService,
    private storageService: StorageService,
    private fireAuth: AngularFireAuth,) { 
  
  }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{
      this.offerId = param.oid || this.chatService.chatOfferId;
      this.chatService.chatType = ChatTypeEnums.offer;
      this.getOfferDetails();
    })
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
    this.getAllChatRoomDetails();
  }

  getAllChatRoomDetails() {
    //chat with firestore
    this.chatService.getAllChatRooms({
      entityId: this.offerId,
      chatType: ChatTypeEnums.offer
    })
    .pipe(
      takeUntil(this.subcriptionStopNotifier)
    )
    .subscribe((fireStoreRes: Array<chatOfferRoom>)=> {
      this.isLoading = false;
      // console.log('Response:::', fireStoreRes);
    this.allRooms = fireStoreRes;
      this.allRooms.map((item: any)=>{
        this.chatService.getOfflineOnlineStatus(item.chatInitiatorDetails.identityId).subscribe((statusRes)=>{
           item.status = statusRes?.state || UserOnlineStatus.offline;
        })
         this.chatService.getRoomUnreadCount({enitityId: this.offerId, roomId:item.id, chatType: ChatTypeEnums.offer})
         .pipe(
            takeUntil(this.subcriptionStopNotifier),
            finalize(()=>{
              return 'hii';
            })
          )
         .subscribe(
          (res: Array<chatOfferMessage>)=>{
              res.sort((a: any,b: any)=> (a.messageTime < b.messageTime) ? 1 : ((a.messageTime > b.messageTime) ? -1 : 0));
              const notiCount = res.length;
              item.totalUnReadMsgCount = notiCount;
              // for(let i=0;i<res.length;i++){
              //   if(res[i].recipientId === this.authService.currentUserId){
              //     item.lasMessage =  res[i].messageBody; 
              //     item.lasMessageTime = res[i].messageTime;
              //     break;
              //   }
              // }
          },error => {
            this.isLoading = false;
            // console.log(error);
          }, () => {
            this.isLoading = false;
            // console.log(this.allRooms);  
          }
        )

        this.chatService.getChatMessagesByRoomId({
          entityId: this.offerId, 
          roomId:item.id, 
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
              if( res.length>0){
                item.lastMessage =  this.getLastMessage(res[0]); 
                item.lastMessageTime = res[0].messageTime; 
                item.lastMessageSenderId = res[0].senderId; 
                item.lastMessageSenderIsLoginUser = this.checkIsItLoggedInUser(res[0].senderId);
                item.lastMessageIsSent = res[0].isSent;
                item.lastMessageIsDelivered = res[0].isDelivered;
                item.lastMessageIsRead = res[0].isRead; 
              }
              this.allRooms.sort((firestE: any, secondE: any)=>{
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
          },error => {
            this.isLoading = false;
            // console.log(error);
          }, () => {
            this.isLoading = false;
            // console.log(this.allRooms);  
          }
        )
      })  
      
    },(error)=>{
      this.isLoading = false;
      // console.log(error);
    });
  }

  openChat(roomId: string){
    if(this.chatType === 'popup')
    this.chatService.changeChatPoppupPage({
      chatPageType: 'chat-msg',
      chatType: ChatTypeEnums.offer,
      entityId: this.offerId,
      roomId: roomId
    });
    else 
      this.router.navigateByUrl(`chat/${ChatTypeEnums.offer}/${this.offerId}/rooms/${roomId}/messages`);
  }

  showTime(utcDateTime: string){
    if(utcDateTime){
      const locatDateTime = moment.utc(utcDateTime).toDate();
      const localTime = moment(locatDateTime).format('hh:mm a'); 
      return localTime;
    }
  }

  openAllUser(){
    // const dialogConfig: any = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.id = 'chat-selected-user-component';
    // dialogConfig.position = {
    //   top: '0px',
    //   right: '0px',
    // };
    // dialogConfig.height = '500px';
    // dialogConfig.width = '700px';
    // dialogConfig.data = { };
    // const modalDialog: any = this.matDialog.open(ChatSelectedUsersComponent, dialogConfig);
    
    // modalDialog.afterClosed().subscribe(result => {
      // console.log(result);
    // })
    this.isChatSelectedUserEnabled = true;
  }

  getSelectedUserList(selectedRooms){
    // console.log(selectedRooms);
    this.chatWithRooms = selectedRooms;
    this.chatService.chatConnectedRooms = selectedRooms;
    this.isChatSelectedUserEnabled = false;
    this.isChatSelectedUserSendMsgEnabled = true;
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

  getOfferDetails(){
    this.offerService.getOfferDetail(this.offerId).subscribe((res: any)=>{
      this.offerDetail = res.payload;
      this.chatService.offerDetail = res.payload;
    })
  }


  initializer(){
    this.subcriptionStopNotifier.next();
    this.subcriptionStopNotifier.complete();
    this.allRooms = [];
  }

  ngOnDestroy(){
    this.initializer();
  }

  showUserImage(room){
    return room.initiatorDisplayImage || room.chatInitiatorDetails?.imageUrl || this.noImage
  }

  getUserStatusImg(status){
    if(status === UserOnlineStatus.online){
      return '/assets/images/user-status-online.png';
    } else {
      return  '/assets/images/user-status-offline.png';
    }
  }

  isMessageAvailable(msg: chatOfferMessage | any): boolean {
    let res = true;
    if(msg.deletedForMe){
      if(this.checkIsItLoggedInUser(msg.deletedForMe,true)> -1){
        res = false;
      }
    }
    return res;
  }

  checkIsItLoggedInUser(userId, shouldFindInArray: boolean = false){
    if(shouldFindInArray){
      return userId.indexOf(this.authService.currentUserId) || userId.indexOf(this.loggedInBusinessId);
    } else {
      return this.authService.currentUserId === userId || this.loggedInBusinessId === userId;
    }
   
  }
}
