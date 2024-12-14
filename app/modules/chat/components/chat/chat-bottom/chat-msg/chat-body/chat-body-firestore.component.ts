import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, Inject, PLATFORM_ID, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService, LoggerService } from '@gintaa/core/services';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { Subject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { ChatConnectModal, chatDealMessage, chatDealRoom, ChatMessageTypeEnums, chatMsgReplyObj, chatOfferMessage, chatOfferRoom, ChatTypeEnums, Response } from '@gintaa/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { OfferService } from '@gintaa/shared/services';
import { DeafaultChatProfiletNoImage, defaultNoImage } from '@gintaa/shared/configs/default.config';

import { takeUntil } from 'rxjs/operators';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import { DealDetailsFormat, DealDetailsOffer, Offer } from '@gintaa/modules/deal-new/models/deal.model';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '@gintaa/core/services/storage.service';
import { ChatAttachImageComponent } from '../../chat-attach-image/chat-attach-image.component';



@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit {

  chatHistoryMsgArr: any = [];
  chatHistoryMsg: any;
  chatMsgSub$: Subscription;
  scrollUp$: Subscription;
  loggedInUserId: string = null;
  loggedInUserBusinessId: string = null;
  defaultPage = -1;
  page = this.defaultPage;
  defaultSize = 10;
  isEndOfChatHistory: boolean = false;
  offerDetail: Offer;
  dealDetail: DealDetailsFormat;
  offerId: string;
  dealId: string;
  roomId: string;
  entityId: string;
  noImage = defaultNoImage;
  chatRoomDetails: chatOfferRoom;
  chatHistroyMsg$: Subscription;
  chatHistoryNotifier = new Subject();
  @Input('chatType') chatType: ChatTypeEnums;
  chatTypeEnums = ChatTypeEnums;
  isLoading: boolean = true;
  @Input('screenType') screenType: string;
  msgTypeEnum = ChatMessageTypeEnums;
  isReply: boolean = false;
  replyObj: chatMsgReplyObj;
  @ViewChild('replySection') replySection: ElementRef;
  @Output('parentScrollToBottom') parentScrollToBottom: EventEmitter<any> = new EventEmitter();
  messagesWithGrpByDate: any = {};
  @ViewChildren("orgMsg", { read: ElementRef }) renderedMsgs: QueryList<ElementRef>;
  isShowReadMoreMsg: any = {};
  isShowReadMoreMsgReply: any = {};


  constructor(
    public chatService: ChatService, 
    public matDialog: MatDialog,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService,
    private authService: AuthService,
    private dealService: DealService,
    private firebaseAuthService: FirebaseAuthService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private storageService: StorageService
    ) { 
    }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.chatType = params.type || this.chatService.chatType;
      this.entityId = this.chatService.entityId;
      if(this.chatType === ChatTypeEnums.offer){
        this.offerId = params.oid || this.chatService.chatOfferId || this.chatService.entityId
      } else if(this.chatType === ChatTypeEnums.deal){
        this.dealId = params.oid || this.chatService.chatDealId || this.chatService.entityId
      }
      
      this.roomId = params.rid || this.chatService.chatRoomId;
      this.getChatEntityDetails();
    })
    this.chatService.fileUploadingStatus(true); 
    this.chatMsgSub$ = this.chatService.chatHistorySubject$
    .subscribe((response) => {
      if(response){
      if(!response.isPaginatedData){
        //this.resetChatMessages();
      }
         
      this.logger.log({
        message:`History Response:::${response}`
      });
      this.page = response.messages.next;
      this.loggedInUserId = this.authService.currentUserId;
      let loggedInBusinessDetails: any = this.storageService.getSelectedBusiness();
      this.loggedInUserBusinessId = loggedInBusinessDetails?.businessId;
      const newEntries = this.chatService.onlyTakeNewEntries({alreadyHavingData: this.chatHistoryMsgArr, currentFirestoreResData: response.messages});
      if(newEntries.length === 0){
        return;
      }
      this.chatHistoryMsgArr = [...this.chatHistoryMsgArr , ...newEntries]; 
      const msgWithGrpByDate = this.prepareChatHistoryMessages(newEntries);
      this.chatHistoryMsg = msgWithGrpByDate;
      this.logger.log({
        message:this.chatHistoryMsg
      }); 
    }
    });
    this.closeReply();
    this.chatService.messageSendSub.subscribe(()=>{
      this.closeReply();
    })
  }

  ngAfterViewInit() {   
    this.scrollUp$ = this.chatService.chatScrollUp.subscribe((res)=>{
       if(res == 'up'){
         //this.loadMoreChat();
       }
    })
  }

  ngOnDestroy() {
    this.page = this.defaultPage;
    if(this.chatMsgSub$) {
      this.chatMsgSub$.unsubscribe();
    }
    if(this.scrollUp$) {
      this.scrollUp$.unsubscribe();
    }
    this.isEndOfChatHistory = false;

    //this.chatHistroyMsg$.closed = true;
    //this.chatService.unsubscribeChatMessages();
    this.initializer();
  }

  showTime(utcDateTime: string){
    if(utcDateTime){
      const locatDateTime = moment.utc(utcDateTime).toDate();
      const localTime = moment(locatDateTime).format('hh:mm a'); 
      return localTime;
    }
  }

  loadMoreChat(){
    //this.page ++;
    if(!this.isEndOfChatHistory){
      //this.getChatHistory();
    }
  }

  prepareChatHistoryMessages(newMessages){
     const dateFormat = 'YYYY-MM-DD';
     this.messagesWithGrpByDate = newMessages.reduce((accumalatedVal: any, currentItem: chatOfferMessage | chatDealMessage)=>{
        let date =  currentItem.messageTime
                            ?moment(new Date(currentItem.messageTime)).format(dateFormat)
                            : '';
        if(date != '' && this.isMessageAvailable(currentItem)){                  
          if(accumalatedVal[date]){
            accumalatedVal[date].push(currentItem);
          } else {
            accumalatedVal[date]= [currentItem];
          }
        }
        return accumalatedVal;
     }, this.messagesWithGrpByDate)
     return this.messagesWithGrpByDate;
  }

  getDateOrName(value){
    const dateFormat = 'YYYY-MM-DD';
    const todayDt = new Date();
    const todayStr = 'TODAY';
    const yesterdayStr = 'YESTERDAY';
    const today = moment(todayDt).format(dateFormat);
    const yesterday = moment(todayDt).subtract(1,'day').format(dateFormat);
    return value === today? todayStr : (value === yesterday? yesterdayStr : value);  
  }

  resetChatMessages(){
    this.chatHistoryMsg = {};
    this.chatHistoryMsgArr = [];
    this.page = this.defaultPage;
    //this.chatService.scrollToChatBottom();
    // if(this.scrollUp$) {
    //   this.scrollUp$.unsubscribe();
    // }
  }

  getRoomDetails() {
    // chat with firestore
    this.chatService.getRoomDetails({
      entityId: this.getEntityId,
      roomId: this.roomId,
      chatType: this.chatType
    })
    .subscribe((fireStoreRes: chatOfferRoom)=> {
      // console.log('Response:::', fireStoreRes);
      this.chatService.chatRoomDetails = this.chatRoomDetails = fireStoreRes;
      this.connectSocketAndRoom(fireStoreRes);    
    },(error)=>{
      this.chatService.fileUploadingStatus(false); 
      // console.log(error);
    });
  }

  connectSocketAndRoom(input: chatOfferRoom | chatDealRoom | any) {
    // chat with firestore
    const roomId = input.id;
    this.chatService.chatConnectedRooms = [input];
    if(this.chatType === ChatTypeEnums.offer){
      const isOfferOwner =  this.chatService.isOfferOwner();
      this.chatService.chatOfferInitiate({...input, roomId: roomId, offerId: this.offerDetail.offerId, isOfferOwner}); 
    } else if(this.chatType === ChatTypeEnums.deal){
      const isDealReceiver =  this.chatService.isDealReceiver();
      this.chatService.chatDealInitiate({
        dealReceiverDetails: input.dealReceiverDetails,
        dealSenderDetails: input.chatInitiatorDetails.identityId === input.dealReceiverDetails.identityId ? input.chatReceiverDetails : input.chatInitiatorDetails,
        dealId: this.dealId,
        roomId: this.roomId,
        isDealReceiver
      }); 
    }
    this.chatHistroyMsg$=this.chatService.getChatMessagesByRoomId({
      entityId: this.getEntityId,
      roomId: roomId,
      chatType: this.chatType,
      orderType: 'asc'
    })
    .pipe(
      takeUntil(this.chatHistoryNotifier)
    )
    .subscribe((fireStoreRes: any)=> {
      this.chatService.fileUploadingStatus(false); 
      // console.log({
      //   message:`Response getOwnerChatHistory:::${fireStoreRes}`
      // });
      fireStoreRes.map((item: any)=>{
        if((item.recipientId === this.authService.currentUserId || item.recipientId === this.loggedInUserBusinessId) && item.isRead===false)
        this.chatService.onReadChat({
          entityId: this.getEntityId ,
          roomId: item.roomId,
          messageId: item.id,
          chatType: this.chatType
        });
      })
      this.chatService.chatHistorySubject.next({messages: fireStoreRes,isPaginatedData: false});  
    },(error)=>{
      this.chatService.fileUploadingStatus(false); 
      console.log({
        message: error
      });
    });
  }

  openImageViewModal(name: string, images: [], isVideo: boolean) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'image-chat-view-component';
    dialogConfig.position = {
      top: '10px',      
    };
    dialogConfig.height = 'auto';
    dialogConfig.width = '500px';
    dialogConfig.data = { files: images, name, isVideo };
    const modalDialog: MatDialogRef<ChatAttachImageComponent, any> = this.matDialog.open(ChatAttachImageComponent, dialogConfig);
  }

  downloadFile(message){
    if(message.messageAttr && message.messageAttr.mediaUrls){
      const url = message.messageAttr.mediaUrls[0];
      //this.chatService.downloadFile(url);
      if (isPlatformBrowser(this.platformId)) {
        window.open(url, '_blank');
      }
    }
  }

  getChatEntityDetails(){
    switch(this.chatType){
      case ChatTypeEnums.offer:
        this.chatService.chatType = ChatTypeEnums.offer;
        this.getOfferDetails();
        break;
      case ChatTypeEnums.deal:
        this.chatService.chatType = ChatTypeEnums.deal;
        this.getDealDetails();  
        break;
      default:
        this.getOfferDetails();  
        break;
    }
  }

  getOfferDetails(){
    this.offerService.getOfferDetail(this.offerId).subscribe((res: any)=>{
      this.offerDetail = res.payload;
      this.chatService.offerDetail = this.offerDetail as any;
      this.getRoomDetails();
    })
  }

  getDealDetails(){
    this.dealService.getDealDetails(this.dealId).subscribe((res: any)=>{
       this.dealDetail = res.payload;
       this.chatService.dealDetail = this.dealDetail;
       this.getRoomDetails();
    })
  }

  get getEntityId(): string{
   return this.chatType === ChatTypeEnums.offer
                          ? this.offerId 
                          : this.dealId
  }

  copyMessage(event: chatOfferMessage | chatDealMessage){
    // const text = event.messageBody;
    // var textField = document.createElement('textarea');
    // textField.value = text;
    // //textField.innerText = text;
    // const selector = document.getElementsByClassName('chatbodyclas');
    // document.body.appendChild(textField);
    // //selector[0].appendChild(textField);
    // textField.select();
    // textField.focus(); //SET FOCUS on the TEXTFIELD
    // try {
    //   var successful = document.execCommand('copy');
    //   var msg = successful ? 'successful' : 'unsuccessful';
    //   console.log('Copying text command was ' + msg);
    // } catch (err) {
    //   console.log('Oops, unable to copy');
    // }
    // textField.remove();
    // console.log('should have copied ' + text); 
    //ajax-error.focus(); //SET FOCUS BACK to MODAL
    //console.log(event);
    const val = event.messageBody;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.select();
    selBox.focus();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  deleteMessage(event: chatOfferMessage | chatDealMessage | any){
    // console.log(event);
    let deletedForUserId = this.loggedInUserBusinessId? this.loggedInUserBusinessId : this.authService.currentUserId;
    let users: any = [];
    this.chatService.deleteMessageForMe({
       chatType: this.chatType,
       messageId: event.id,
       deletedForUserId: this.loggedInUserBusinessId? this.loggedInUserBusinessId : this.authService.currentUserId,
       deletedForBusinessMemberId: this.authService.currentUserId
    })

    /// as we are not taking the updated object any more only new data thats the reason this deletedForMe change value we are doing from local
    if(event.deletedForMe && Array.isArray(event.deletedForMe)){
      if(event.deletedForMe.indexOf(deletedForUserId) === -1){
        users = [...event.deletedForMe , deletedForUserId]
        event.deletedForMe = users;
      }
    } else {
      users = [deletedForUserId];
      event.deletedForMe = users;
    }
  }

  replyMessage(event: chatOfferMessage | chatDealMessage){
    // console.log(event);
    this.isReply = true;
    this.chatService.isReply =  true;
    this.chatService.replyObj = this.replyObj = {
      orgMsgId: event.id,
      senderId: event.senderId,
      senderName: event.senderId === this.chatService.chatConnect.recipientId
                             ? this.chatService.chatConnect.receipentName
                             : this.chatService.chatConnect.senderName,
      messageBody: event.messageBody,
      messageType: event.messageType,
      messageAttr: event.messageAttr
    }
    //this.replySection.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(()=>{
      this.parentScrollToBottom.emit();
    },100)
  }

  closeReply(){
    this.isReply = false;
    this.replyObj = {
      orgMsgId: '',
      senderId: '',
      senderName: '',
      messageBody: '',
      messageType: '',
      messageAttr: []
    }
    this.chatService.replyObj = this.replyObj;
  }

  isMessageAvailable(msg: chatOfferMessage | chatDealMessage | any){
    let res = true;
    if(msg.deletedForMe){
      if((msg.deletedForMe.indexOf(this.authService.currentUserId) > -1) || (msg.deletedForMe.indexOf(this.loggedInUserBusinessId) > -1)){
        res = false;
      }
    }
    return res;
  }

  reportMessage(event: chatOfferMessage | chatDealMessage){
    // console.log(event);
  }

  checkIsLoggedInUser(id: string, name: string){
    return id === this.loggedInUserId? 'You' : name;
  }

  initializer(){
    this.chatHistoryNotifier.next();
    this.chatHistoryNotifier.complete();
    this.chatHistoryMsg = [];
    this.chatService.chatConnect = new ChatConnectModal();
    this.closeReply();
  }

  replyMsgScrollTo(replyObj: chatMsgReplyObj){
    const msgArr = this.renderedMsgs.toArray();
    let replyMsgIndex: number;
    this.chatHistoryMsgArr.filter((item)=> this.isMessageAvailable(item)).map((item, index)=>{
      if(item.id === replyObj.orgMsgId){
        replyMsgIndex = index;
      }
    })
    setTimeout(()=>{
      this.renderer.setStyle( msgArr[replyMsgIndex].nativeElement, 'background', '#e2e2e8')
      msgArr[replyMsgIndex].nativeElement.scrollIntoView({
        behavior: 'smooth',
        //block: 'center'
      })
      // setTimeout(()=>{
      //   this.renderer.setStyle( msgArr[replyMsgIndex].nativeElement, 'background', '')
      // },1500)
    },500)

  }

  showrUserImage(msg: chatOfferMessage | chatDealMessage){
    return msg.messageAttr.senderImage && msg.messageAttr.senderImage.length>0
              && msg.messageAttr.senderImage[0] ? msg.messageAttr.senderImage[0]
              : DeafaultChatProfiletNoImage.msgSection;
  }

  isUserImageAvailable(msg: chatOfferMessage | chatDealMessage){
    return msg.messageAttr.senderImage && msg.messageAttr.senderImage.length>0
              && msg.messageAttr.senderImage[0]
  }

  isMsgSentByLoggedInUser(msg){
    return this.loggedInUserId==msg.senderId || this.loggedInUserBusinessId==msg.senderId;
  }

  isMsgNotSentByLoggedInUser(msg){
    return this.loggedInUserId!==msg.senderId && this.loggedInUserBusinessId!==msg.senderId;
  }

}
