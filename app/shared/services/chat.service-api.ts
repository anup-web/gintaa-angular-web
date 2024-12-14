import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@gintaa/env';
import { sharedApiUrls } from '../configs/shared-api-url.config';
import { BehaviorSubject, bindCallback, Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';
import * as uuid from 'uuid';
import { ChatConnectModal, Response } from '../models';
import { LoggerService } from '@gintaa/core/services';
import { Offer } from '@gintaa/modules/offer/model/offer';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ChatBckpService {
    chatHistorySubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    chatHistorySubject$: Observable<any> = this.chatHistorySubject.asObservable();
    chatClickedSub: Subject<boolean> = new Subject<boolean>();
    chatClickedSub$: Observable<boolean> = this.chatClickedSub.asObservable();
    chatConnectSubject = new Subject<any>();
    chatMessageTyping = new Subject<any>();
    chatMessagePrivate = new Subject<any>();
    chatMessageDelivered = new Subject<any>();
    chatSenderMessage = new Subject<any>();
    chatMessageRead = new Subject<any>();
    chatDisconnect = new Subject<any>();
    chatOnEventsSubject = new Subject<any>();
    chatScrollUp = new Subject<any>();

    offerDetail: Offer;
    offerId: string;
    socket: any;
    chatConnect: ChatConnectModal = new ChatConnectModal();
    chatContainer: HTMLElement;
    roomUserDetails: any = [];
    chatOfferId: string;
    chatRoomId: string;

    anyFileUploading:boolean = false;

    private _loading: boolean = false;
    progressStatus: Subject<boolean> = new Subject();
    chatPopupPage: string = 'chat-offer-deal';
    showChatModalType: string  = 'small';

    constructor(
        private httpClient: HttpClient,
        private logger: LoggerService
    ) {}

    getOngoingChatCommunications(additionalObj?:{page: number, size: number }) : Observable<any>{
      const url: string = `${environment.serverUrl}${sharedApiUrls.offerChatCommunication}?page=`+ ( additionalObj ? additionalObj.page : 0) + '&size=' + (additionalObj ? additionalObj.size : 10);
      return this.httpClient.get<any>(url);
    }

    createRoom(offerId: string) : Observable<any>{
        const requestURL = `${environment.serverUrl}${sharedApiUrls.createRoom}/${offerId}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(requestURL, { headers });
    }

    getAllChatRooms(offerId: string) : Observable<any>{
      const url: string = `${environment.serverUrl}${sharedApiUrls.createRoom}/${offerId}`;
      return this.httpClient.get<any>(url);
    }

    getChatMessagesByRoomId(roomId: string, additionalObj?:{page: number, size: number }): Observable<any> {
      const url: string = `${environment.serverUrl}${sharedApiUrls.getChatMessageRoomUrl}/${roomId}?next=`+ ( additionalObj ? additionalObj.page : -1) + '&size=' + (additionalObj ? additionalObj.size : 10);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      // let params: HttpParams = new HttpParams();
      // params = params.append('page', additionalObj ? additionalObj.page : '0').append('size',  additionalObj ? additionalObj.page : '1');
      return this.httpClient.post<any>(url, { headers});
      // {roomId}?page=0&size=4
    }

    uploadChatDocument(formData: FormData) : Observable<HttpEvent<Response>>{
      const docUrl: string = `${environment.serverUrl}${sharedApiUrls.getChatDocumentUrl}`;
      return this.httpClient.post<Response>(docUrl, formData,
        {
          reportProgress: true,
          observe: 'events'
        });
    }

    uploadChatImage(formData: FormData) : Observable<HttpEvent<Response>>{
      const requestURL = `${environment.serverUrl}${sharedApiUrls.getChatImageUrl}`;
      return this.httpClient.post<Response>(requestURL, formData,
        {
          reportProgress: true,
          observe: 'events'
        });
    }

    uploadChatVideo(formData: FormData) : Observable<HttpEvent<Response>>{
      const requestURL = `${environment.serverUrl}${sharedApiUrls.getChatVideoUrl}`;
      return this.httpClient.post<Response>(requestURL, formData,
        {
          reportProgress: true,
          observe: 'events'
        });
    }

    get offerDetails(): Offer {
        return this.offerDetail;
    }

    isOfferOwner(): boolean {
        return this.offerDetail && this.offerDetail.currentUserOfferOwner;
    }
    
    isOfferViewer(): boolean {
        return this.offerDetail && !this.offerDetail.currentUserOfferOwner;
    }

    chatInitiate(input) {
      this.chatConnect.offerId = input.offerId;
      this.chatConnect.roomId = input.roomId;
      this.chatConnect.offerOwnerId = input.ownerId;
      if(input.isOfferOwner) {
        this.chatConnect.senderId = input.ownerId;
        this.chatConnect.recipientId = input.initiatorId;
        this.chatConnect.isOfferOwner = true;
        this.chatConnect.receipentName = input.initiatorDisplayName;
        this.chatConnect.receipentImage = input.initiatorDisplayImage;
      } else {
        this.chatConnect.senderId = input.initiatorId;
        this.chatConnect.recipientId = input.ownerId;
        this.chatConnect.isOfferOwner = false;
        this.chatConnect.receipentName = input.ownerDisplayName;
        this.chatConnect.receipentImage = input.ownerDisplayImage;
      }      
      this.setupSocketConnection();
    }


    setupSocketConnection() {
        const connectUrl: string = environment.chatSocketUrl;
        const socketConfig = {
          path: '/ws',
          query: {
            userDetails : this.chatConnect.senderId
          },
          reconnectionAttempts: 3,
          transports: ['websocket']
        };
        this.socket = io(connectUrl,  socketConfig);

        this.listen('connect').subscribe(() => {
          this.logger.log({
            message: 'Socket Connected !!',
            moduleName: 'CHAT_SOCKET_CONNECTION'
          });
          this.emit('join', this.chatConnect.roomId);
          this.chatConnectSubject.next({
            message: 'Open Chat Module',
            connectObj: this.chatConnect,
            isChatModal: true
          });
        });

        this.listen('echo').subscribe((data) => {
          this.logger.log({
            message: `Received echo!!${data}`
          });
        });

        this.listen('typing').subscribe((data) => {
          this.logger.log({
            message: `Received typing event${data}`
          });
          this.chatMessageTyping.next(data);
        });

        setInterval(() => {
          this.chatMessageTyping.next('');
        }, 2000);

        // this.listenWithCallback('private_message').subscribe((data) => {
        //   this.logger.log({message:'Received private_message', data);
        //   this.chatMessagePrivate.next(data);
        // });

        this.socket.on('private_message', (data, ackServerCallback) => {
          this.logger.log({
            moduleName: 'CHAT',
            messageObj: data,
            message: 'Received private_message'
          });
          this.chatMessagePrivate.next(data);
          if (ackServerCallback) {
            this.logger.log({message: 'Received private_message callback'});
            // send ack data to server
            ackServerCallback(data);
            setTimeout(() => {
               this.readMessage(data.messageId);
            }, 200);
          }
        });

        this.listen('delivered').subscribe((data) => {
          this.logger.log({
            message: `Received delivered message ${data}`
          });
          this.chatMessageDelivered.next(data);
        });

        this.listen('read').subscribe((data) => {
          this.logger.log({
            message: `Received read message ${data}`
          });
          this.chatMessageRead.next(data);
        });

        this.listen('disconnect').subscribe(() => {
          this.logger.log({
            message: 'Socket Disconnected !!',
            moduleName: 'CHAT_SOCKET_CONNECTION'
          });
        });

        // this.listen('connect');
        // this.listen('typing');
        // this.listen('private_message');
        // this.listen('delivered');
        // this.listen('echo');
        // this.listen('read');
        // this.listen('disconnect');
      }

      // ackServerCallback(data) {
      //     return data;
      // }
    
      sendMessage(message) {
        const messageType = message.messageType || 'HTML';
        const messageId = uuid.v4();
        const jsonObject = {
            isSent: false,
            delivered: false,
            readFlag: false,
            senderId : this.chatConnect.senderId,
            offerId: this.chatConnect.offerId,
            recipientId: this.chatConnect.recipientId,
            roomId: this.chatConnect.roomId,
            messageType: messageType,
            messageBody: message.messageBody,
            messageId: messageId,
            messageTime: new Date().toISOString(),
            docId: message.docId || null,
            messageAttr: message.messageAttr,
        }
        this.emit('private_message', jsonObject);
        this.chatSenderMessage.next(jsonObject);
      }

      sendImageMessage(mediaMsg, mediaFiles, isVideo) {
            const messageType = isVideo ? 'VIDEO' : 'IMAGE';
            const messageId = uuid.v4();
            const mediaReq: any = {
              isSent: false,
              delivered: false,
              readFlag: false,  
              senderId : this.chatConnect.senderId,
              offerId: this.chatConnect.offerId,
              recipientId: this.chatConnect.recipientId,
              roomId: this.chatConnect.roomId,           
              messageBody: mediaMsg,
              messageType: messageType,
              messageId: messageId,
              messageAttr: {
                mediaUrls : mediaFiles
              },
              messageTime: new Date().toISOString()
            };
            this.emit('private_message', mediaReq);
            this.chatSenderMessage.next(mediaReq); 
      }

      sendOfferMessage(offersObj) {
        const attachedOffers = offersObj.offers;
        if(attachedOffers.length) {
          attachedOffers.forEach(offer => {
            this.logger.log({
              message:'Send Offer Messages'
            })
            const messageId = uuid.v4();
            const offerReq: any = {
              isSent: false,
              delivered: false,
              readFlag: false,  
              senderId : this.chatConnect.senderId,
              offerId: this.chatConnect.offerId,
              recipientId: this.chatConnect.recipientId,
              roomId: this.chatConnect.roomId,             
              messageBody: '',
              messageType: 'OFFER',
              messageId: messageId,
              messageAttr: {
                offerUrl : [offer.images? offer.images.url : ''],
                offerName: [offer.name || ''],
                offerCondition: [offer.itemCondition || ''],           
                offerPrice: [offer.unitOfferValuation || 0],
                offerActive: [offer.activeSince || ''],
                offerId : [offer.offerId],        
              },
              messageTime: new Date().toISOString()
            };
            this.emit('private_message', offerReq);
            this.chatSenderMessage.next(offerReq); 
          });
        }        
        if(offersObj.msg)
        this.sendMessage(offersObj.msg);   
      }
    
      startTyping() {
        const messageId = uuid.v4();
        const jsonObject = {
            senderId : this.chatConnect.senderId,
            offerId: this.chatConnect.offerId,
            recipientId: this.chatConnect.recipientId,
            roomId: this.chatConnect.roomId,
            messageId: messageId
        }
        this.emit('typing', jsonObject);
      }
    
      readMessage(messageId) {
        const jsonObject = {
            senderId : this.chatConnect.senderId,
            offerId: this.chatConnect.offerId,
            recipientId: this.chatConnect.recipientId,
            roomId: this.chatConnect.roomId,
            messageId: messageId
        }
        this.emit('read', jsonObject);
      }

      formatMessage(chatHistoryMsg: any): any[] {
        let chatMsgArr = [];
        const msgKey = Object.keys(chatHistoryMsg);
        msgKey.forEach(key => {
          // chatMsgArr = [...chatMsgArr, ...chatHistoryMsg[key]]
          chatHistoryMsg[key].map((item: any)=>{
                item.isSent = true;
          })
          chatMsgArr = [...chatMsgArr, {
            key,
            msg: [...chatHistoryMsg[key].reverse()]
          }]
        })
        this.logger.log({
          message:`Msg Array:::${chatMsgArr}`
        });
        return chatMsgArr.reverse();
      }

      listen(eventName: string) {
        return new Observable((subscriber) => {
          this.socket.on(eventName, (data) => { 
            //this.onEventsRes[eventName] = data;
            subscriber.next(data);
          })
        })
      }

      listenWithCallback(eventName: string) {
        return new Observable((subscriber) => {
          this.socket.on(eventName, (data, callback) => {            
            const getJSONAsObservable = bindCallback(data, callback);
            subscriber.next(getJSONAsObservable);
          })
        })
      }

      emit(eventName: string, data: any) {
        if(this.socket){
          this.socket.emit(eventName, data);
        }
      }

      scrollToBottom() {
        this.chatContainer = document.querySelector('.chat-container-content'); 
        this.chatContainer.scrollTo({top: this.chatContainer.scrollHeight, behavior: 'smooth'});
      }

      scrollToChatBottom() {
        setTimeout(() => {
          this.chatContainer = document.querySelector('.chat-container-content'); 
          this.chatContainer.scrollTo({top: this.chatContainer.scrollHeight, behavior: 'smooth'});
        }, 1000);
      }

      setAllRoomUserDetails(rooms: any[]) {
        this.roomUserDetails = [...rooms];
        this.logger.log({
          moduleName: 'Chat Room User Details',
          message:'Room User Details:::',
          messageObj: this.roomUserDetails
        });
      }

      getAllRoomUserDetails(): any[] {
        return this.roomUserDetails;
      }

  get progress(): boolean {
    // console.log("get loading: " + this._loading);
    return this._loading;
  }

  set progress(value) {
    // console.log("set loading: " + value);
    this._loading = value;
    this.progressStatus.next(value);
  }

  startProgressBar() {
    // console.log("startProgressBar");
    this.progress = true;
  }

  stopProgressBar() {
    // console.log("stopProgressBar");
    this.progress = false;
  }

  leaveCurrentRoom(){
    this.emit('leave', this.chatConnect.roomId);
  }

  disconnect() {
    this.socket.disconnect();
  }

  getRoomDetails(roomId: string) : Observable<any>{
    const url: string = `${environment.serverUrl}${sharedApiUrls.getRoomDetails}/${roomId}`;
    return this.httpClient.get<any>(url);
  }

  downloadFile(fileUrl){
     this.httpClient.get(fileUrl, {responseType: 'blob'}).subscribe((blob)=>{
        saveAs(blob,'test.pdf');
     })
  }

  changeChatPoppupPage(type: string, offerId?: string, roomId?: string){
     this.chatPopupPage = type || 'chat-offer-deal';
     this.chatOfferId = offerId || this.chatOfferId;
     this.chatRoomId = roomId || this.chatRoomId;
  }

  fileUploadingStatus(status: boolean){
    this.anyFileUploading = status;
  }

  changeChatModalType(type:string){
    this.showChatModalType = type;
  }
}
