import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthService, LoggerService } from '@gintaa/core/services';
import { StorageService } from '@gintaa/core/services/storage.service';
import { DealDetailsFormat } from '@gintaa/modules/deal-new/models/deal.model';
import { saveAs } from 'file-saver';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { chatCollectionObj, ChatConnectModal, ChatCurrentTabEnums, chatDealMessage, chatDealRoom, chatMsgReplyObj, chatOfferMessage, chatOfferRoom, chatOngoingDealCommunication, chatOngoingOfferCommunication, ChatTypeEnums, FirebaseFunctions, UserOnlineStatus } from '../models';
import { Offer } from '../models/offer';

type defualtOrderType = 'asc' | 'desc'
const defaultChatConfig = {
  limit: 10000,
  orderBy: 'messageTime',
  orderType: 'desc'
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatHistorySubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  chatHistorySubject$: Observable<any> = this.chatHistorySubject.asObservable();
  chatConnectSubject = new Subject<any>();
  chatScrollUp = new Subject<any>();

  offerDetail: Offer;
  dealDetail: DealDetailsFormat;
  offerId: string;
  dealId: string;
  chatConnect: ChatConnectModal = new ChatConnectModal();
  roomUserDetails: any = [];
  chatType: ChatTypeEnums;
  chatOfferId: string;
  chatDealId: string;
  chatRoomId: string;
  entityId: string;

  anyFileUploading: boolean = false;

  private _loading: boolean = false;
  progressStatus: Subject<boolean> = new Subject();
  chatPopupPage: string = 'chat-offer-deal';
  showChatModalType: string = 'small';
  messageRead$: any;

  mainCollection: string;
  roomCollection: string;
  msgCollection: string;
  chatConnectedRooms: Array<chatOfferRoom | chatDealRoom> = [];
  totalUnreadCount = {
    [ChatTypeEnums.offer]: 0,
    [ChatTypeEnums.deal]: 0
  };
  chatRoomDetails: chatOfferRoom | chatDealRoom;
  isReply: boolean = false;
  replyObj: chatMsgReplyObj;
  messageSendSub: Subject<any> = new Subject();
  offerSelectedUserList: any = [];
  currentTab: ChatCurrentTabEnums = ChatCurrentTabEnums.OFFER;
  isChatConnected: Subject<boolean> = new Subject();
  openChatWindow: Subject<string> = new Subject();
  currentUserOfflineOnlineStatus: UserOnlineStatus = UserOnlineStatus.offline;

  chatTextCntForReadMore: number = 80;
  loggedInUserAllStatus: {
    alreadyReportedOtherUser: boolean,
    alreadyCallerHasBlockUser: boolean,
    alreadyCallerIsBlockedByUser: boolean,
    alreadyBothBlocked: boolean
  } = {
    alreadyReportedOtherUser: false,
    alreadyCallerHasBlockUser: false,
    alreadyCallerIsBlockedByUser: false,
    alreadyBothBlocked: false
  }

  unreadCountUpdate: Subject<any> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private logger: LoggerService,
    private fireStore: AngularFirestore,
    private authService: AuthService,
    private angularFireFun: AngularFireFunctions,
    private angularFireDb: AngularFireDatabase,
    private storageService: StorageService
  ) { 
    this.initialize();
  }

  getOngoingChatCommunications(chatType: ChatTypeEnums, additionalObj?: { page: number, size: number }): Observable<any> {
    //chat with firestore
    this.setCollectionNames(chatType);
    return this.fireStore
      .collection(this.mainCollection, (ref) => {
        let queryRef: any;
        let selectedBusinessId: any = this.storageService.getSelectedBusiness();
        if (selectedBusinessId) {
          queryRef = ref.where('participantBusinessIds', 'array-contains', selectedBusinessId.businessId);
        } else {
          queryRef = ref.where('participants', 'array-contains', this.authService.currentUserId);
        }
        
        return queryRef.limit(additionalObj?.size || defaultChatConfig.limit);
      })
      .valueChanges({idField: 'id'})
      //.snapshotChanges()
      // .pipe(
      //   debounceTime(300),
      //   map((e: any) => { 
      //     return e.map((item) => {
      //       return {
      //         id: item.payload.doc.id,
      //         ...item.payload.doc.data()
      //       }
      //     })
      //   })
      // )
  }

  getOngoingDealChatCommunications(chatType: ChatTypeEnums, additionalObj?: { page: number, size: number }): Observable<any> {
    //chat with firestore
    this.setCollectionNames(chatType);
    return this.fireStore
    .collection(this.mainCollection, (ref) => {
      let queryRef: any;
      let selectedBusinessId: any = this.storageService.getSelectedBusiness();
      if (selectedBusinessId) {
        queryRef = ref.where('participantBusinessIds', 'array-contains', selectedBusinessId.businessId);
      } else {
        queryRef = ref.where('participants', 'array-contains', this.authService.currentUserId);
      }
      
      return queryRef.limit(additionalObj?.size || defaultChatConfig.limit);
    })
    .valueChanges({idField: 'id'})
      // .snapshotChanges()
      // .pipe(
      //   debounceTime(300),
      //   map((e: any) => {
      //     return e.map((item) => {
      //       return {
      //         id: item.payload.doc.id,
      //         ...item.payload.doc.data()
      //       }
      //     })
      //   })
      // )
  }

  createRoom(input: any, chatType: string): Observable<any> {
    //chat with firestore
    switch (chatType) {
      case ChatTypeEnums.offer:
        return this.createOfferRoom(input);
      case ChatTypeEnums.deal:
        return this.createDealRoom(input);
      default:
        return this.createOfferRoom(input);
    }
  }

  createOfferRoom(offer: Offer): Observable<any> {
    
    let selectedBusinessId: any = this.storageService.getSelectedBusiness();
    const initiatorDetails = {
      personal: {
        isBusiness: false,
        identityId: this.authService.currentUserId,
        name: this.authService.currentUserName,
        imageUrl: this.authService.currentUserImage
      },
      business: {
        isBusiness: true,
        identityId: selectedBusinessId?.businessId,
        imageUrl: selectedBusinessId?.businessLogo,
        name: selectedBusinessId?.businessName,
        businessMembers: [{
          businessRole: selectedBusinessId?.businessRole,
          //isChatInitiator: true,
          identityId: this.authService.currentUserId,
          name: this.authService.currentUserName,
          imageUrl: this.authService.currentUserImage
        }]
      }
    };

    const receiverDetails = {
      personal: {
        isBusiness: false,
        name: offer.user.name,
        identityId: offer.user.identityId,
        imageUrl: offer.user.imageUrl
      },
      business: {
        isBusiness: true,
        identityId: offer.business?.businessId,
        imageUrl: offer.business?.logoUrl,
        name: offer.business?.name,
        businessMembers: [{
          businessRole: offer.business?.role,
          name: offer.user.name,
          identityId: offer.user.identityId,
          imageUrl: offer.user.imageUrl
        }]
      }
    };

    const chatInitiator: any = selectedBusinessId && selectedBusinessId.businessId ? initiatorDetails.business : initiatorDetails.personal;

    const chatReceiver: any = offer.business && offer.business.businessId ? receiverDetails.business : receiverDetails.personal
                         

    this.setCollectionNames(ChatTypeEnums.offer);
    return new Observable((subscriber) => {
      this.fireStore.collection(this.mainCollection)
      .doc(offer.offerId)
      .valueChanges({idField: 'id'})
        // .snapshotChanges()
        // .pipe(
        //   debounceTime(300),
        //   map((e: any) => {
        //     return e.map((item) => {
        //       return {
        //         id: item.payload.doc.id,
        //         ...item.payload.doc.data()
        //       }
        //     })
        //   })
        // )
        .subscribe((communictionRes: any) => {
          this.fireStore.collection(this.mainCollection)
          .doc(offer.offerId)
          .collection(this.roomCollection, (ref)=>{
            return ref.where('chatInitiatorDetails.identityId','==', chatInitiator.identityId)
          })
          .valueChanges({idField: 'id'})
          .subscribe((roomRes)=>{
            let initiatorBusinessMembers: any= [chatInitiator];
            if(roomRes.length > 0){
              const isRoomAlreadyCreatedByBusinessProfile = roomRes[0].chatInitiatorDetails && roomRes[0].chatInitiatorDetails.businessMembers && roomRes[0].chatInitiatorDetails.businessMembers.length>0;
              const isRoomAlreadyCreatedByInitiator = roomRes[0].chatInitiatorDetails && roomRes[0].chatInitiatorDetails.businessMembers && roomRes[0].chatInitiatorDetails.businessMembers.find((item)=> item.identityId === initiatorDetails.personal.identityId);

              if((isRoomAlreadyCreatedByBusinessProfile && isRoomAlreadyCreatedByInitiator) || !roomRes[0].chatInitiatorDetails?.businessMembers){
                subscriber.next({
                  roomId: roomRes[0].id
                });
                return;
              } else {
                initiatorBusinessMembers = [...roomRes[0].chatInitiatorDetails?.businessMembers, ...initiatorBusinessMembers];
                initiatorBusinessMembers = [... new Set(initiatorBusinessMembers)];
              }

              
              
            } else if(communictionRes.offerDetails){
                  if(chatInitiator.isBusiness){
                    chatInitiator.businessMembers[0].isChatInitiator = true;
                  }
                  const roomData: chatOfferRoom = {
                    offerId: offer.offerId,
                    offerOwnerDetails: chatReceiver,
                    chatInitiatorDetails: chatInitiator,
                    isMuted: false,
                    isBlocked: false,
                    createdAt: new Date().toISOString(),
                  }
                  const roomId = `${chatInitiator.identityId}_${chatReceiver.identityId}`
                  this.fireStore.collection(this.mainCollection).doc(offer.offerId).collection(this.roomCollection).doc(roomId).set(roomData).then(() => {
                    subscriber.next({
                      roomId: roomId
                    });
                  });
                  return;
            }
            let participants = [];
            let participantBusinessIds = [];

            
            if(chatReceiver.isBusiness){
              participantBusinessIds.push(chatReceiver.identityId);
            } else {
              participants.push(chatReceiver.identityId);
            } 
            if(chatInitiator.isBusiness){
              participantBusinessIds.push(chatInitiator.identityId);
            } else {
              participants.push(chatInitiator.identityId);
            } 

            let curDate = '';

            if (communictionRes.participants && communictionRes.participants.length>0) {
              participants = [...communictionRes.participants, ...participants]
              participantBusinessIds = [...communictionRes.participantBusinessIds, ...participantBusinessIds]
              curDate = communictionRes.createdAt
            } else {
              curDate = new Date().toISOString();
            }
  
            participants = [... new Set(participants)];
            participantBusinessIds = [... new Set(participantBusinessIds)];
  
            const data: chatOngoingOfferCommunication = {
              offerDetails: {
                offerId: offer.offerId,
                offerName: offer.name,
                offerImage: offer.images.length > 0 ? offer.images[0].url : ''
              },
              offerOwnerDetails: chatReceiver,
              participants: participants,
              participantBusinessIds: participantBusinessIds,
              createdAt: curDate,
            }
           
            this.fireStore.collection(this.mainCollection).doc(offer.offerId).set(data).then(() => {
              
              if(chatInitiator.isBusiness){
                chatInitiator.businessMembers = initiatorBusinessMembers;
                chatInitiator.businessMembers[0].isChatInitiator = true;
              }
                

              const roomData: chatOfferRoom = {
                offerId: offer.offerId,
                offerOwnerDetails: chatReceiver,
                chatInitiatorDetails: chatInitiator,
                isMuted: false,
                isBlocked: false,
                createdAt: new Date().toISOString(),
              }
              const roomId = `${chatInitiator.identityId}_${chatReceiver.identityId}`
              this.fireStore.collection(this.mainCollection).doc(offer.offerId).collection(this.roomCollection).doc(roomId).set(roomData).then(() => {
                subscriber.next({
                  roomId: roomId
                });
              });
            })
          })
        })
    })
  }

  createDealRoom(deal: any) {
    let selectedBusinessId: any = this.storageService.getSelectedBusiness();
    const initiatorDetails = {
      personal: {
        isBusiness: false,
        identityId: this.authService.currentUserId,
        name: this.authService.currentUserName,
        imageUrl: this.authService.currentUserImage
      },
      business: {
        isBusiness: true,
        identityId: selectedBusinessId?.businessId,
        imageUrl: selectedBusinessId?.businessLogo,
        name: selectedBusinessId?.businessName,
        businessMembers: [{
          businessRole: selectedBusinessId?.businessRole,
          //isChatInitiator: true,
          identityId: this.authService.currentUserId,
          name: this.authService.currentUserName,
          imageUrl: this.authService.currentUserImage
        }]
      }
    };
    
    this.setCollectionNames(ChatTypeEnums.deal);
    return new Observable((subscriber) => {
      this.fireStore.collection(this.mainCollection)
        .doc(deal.dealRefId)
        .collection(this.roomCollection)
        .valueChanges({idField: 'id'})
        // .snapshotChanges().pipe(
        //   debounceTime(300),
        //   map((e: any) => {
        //     return e.map((item) => {
        //       return {
        //         id: item.payload.doc.id,
        //         ...item.payload.doc.data()
        //       }
        //     })
        //   })
        // )
        .subscribe((res: Array<any>) => {
          if (res.length > 0) {
            subscriber.next({
              roomId: res[0].id
            })
            return;
          }
          const chatInitiatorDetails = selectedBusinessId.businessId ? initiatorDetails.business : initiatorDetails.personal; 
          const chatReceiverDetails = {
            identityId: this.isDealReceiver(deal.receiver.id)
              ? deal.sendingBusinessInfo? deal.sendingBusinessInfo?.businessId : deal.sender.id
              : deal.receivingBusinessInfo? deal.receivingBusinessInfo.businessId : deal.receiver.id,
            name: this.isDealReceiver(deal.receiver.id)
              ? deal.sendingBusinessInfo? deal.sendingBusinessInfo.name : deal.sender.name
              : deal.receivingBusinessInfo? deal.receivingBusinessInfo.name : deal.receiver.name,
            imageUrl: this.isDealReceiver(deal.receiver.id)
              ? deal.sendingBusinessInfo? deal.sendingBusinessInfo.logoUrl : deal.sender.imageUrl
              : deal.receivingBusinessInfo? deal.receivingBusinessInfo.logoUrl : deal.receiver.imageUrl,
          }
          const dealSenderDetails = {
            identityId:  deal.sendingBusinessInfo? deal.sendingBusinessInfo.businessId : deal.sender.id,
            name: deal.sendingBusinessInfo? deal.sendingBusinessInfo.name : deal.sender.name,
            imageUrl: deal.sendingBusinessInfo? deal.sendingBusinessInfo.logoUrl : deal.sender.imageUrl
          }
          const dealReceiverDetails = {
            identityId: deal.receivingBusinessInfo? deal.receivingBusinessInfo.businessId : deal.receiver.id,
            name: deal.receivingBusinessInfo? deal.receivingBusinessInfo.name : deal.receiver.name,
            imageUrl: deal.receivingBusinessInfo? deal.receivingBusinessInfo.logoUrl : deal.receiver.imageUrl
          }

          let participants = [];
          let participantBusinessIds = [];

    
          if(deal.sendingBusinessInfo && deal.sendingBusinessInfo.businessId){
            participantBusinessIds.push(deal.sendingBusinessInfo.businessId);
          } else {
            participants.push(deal.sender.id);
          } 
          if(deal.receivingBusinessInfo && deal.receivingBusinessInfo.businessId){
            participantBusinessIds.push(deal.receivingBusinessInfo.businessId);
          } else {
            participants.push(deal.receiver.id);
          }

          const data: chatOngoingDealCommunication = {
            sender: dealSenderDetails,
            receiver: dealReceiverDetails,
            participants: participants,
            participantBusinessIds: participantBusinessIds,
            offeredOffers: deal.offeredOffers || null,
            offeredAmount: deal.offeredAmount || null,
            requestedOffers: deal.requestedOffers || null,
            requestedAmount: deal.requestedAmount || null,
            createdAt: new Date().toISOString(),
          }

          this.fireStore.collection(this.mainCollection).doc(deal.dealRefId).set(data).then(() => {
            const roomData: chatDealRoom = {
              dealId: deal.dealRefId,
              chatInitiatorDetails: chatInitiatorDetails,
              chatReceiverDetails: chatReceiverDetails,
              dealReceiverDetails: dealReceiverDetails,
              isMuted: false,
              isBlocked: false,
              createdAt: new Date().toISOString(),
            }
            const roomId = `${chatInitiatorDetails.identityId}_${chatReceiverDetails.identityId}`
            this.fireStore.collection(this.mainCollection).doc(deal.dealRefId).collection(this.roomCollection).doc(roomId).set(roomData).then(() => {
              subscriber.next({
                roomId: roomId
              });
            });
          })
        })
    })
  }


  getAllChatRooms({
    entityId,
    chatType
  }: {
    entityId: string,
    chatType: ChatTypeEnums
  }): Observable<any> {
    // chat with firestore
    entityId = entityId || this.entityId;
    this.setCollectionNames(chatType);
    return this.fireStore
    .collection(this.mainCollection)
    .doc(entityId)
    .collection(this.roomCollection)
    .valueChanges({idField: 'id'})
    // .snapshotChanges()
    //   .pipe(
    //     debounceTime(500),
    //     map((e: any) => {
    //       return e.map((item) => {
    //         return {
    //           id: item.payload.doc.id,
    //           ...item.payload.doc.data()
    //         }
    //       })
    //     })
    //   );
  }

  getChatMessagesByRoomId({ entityId, roomId, chatType, start, limit, orderBy, orderType }: {
    entityId: string,
    roomId: string,
    chatType: ChatTypeEnums,
    start?: number,
    limit?: number,
    orderBy?: string,
    orderType?: defualtOrderType
  }): Observable<any> {
    // chat with firestore 
    orderBy = orderBy || defaultChatConfig.orderBy;
    orderType = orderType || defaultChatConfig.orderType as defualtOrderType;
    limit = limit || defaultChatConfig.limit;
    entityId = entityId || this.entityId;
    this.setCollectionNames(chatType);
    return this.fireStore.collection(this.mainCollection).doc(entityId).collection(this.roomCollection).doc(roomId).collection(this.msgCollection, (ref) => {
      return ref
        //.where('deletedForMe','not-in', [this.authService.currentUserId])
        //.orderBy('deletedForMe', orderType)
        .orderBy(orderBy, orderType)
        .limit(limit);
    })
      .valueChanges({ idField: 'id'})
      // .snapshotChanges()
      // .pipe(
      //   debounceTime(500),
      //   map((e: any) => {
      //     return e.map((item) => {
      //       return {
      //         id: item.payload.doc.id,
      //         ...item.payload.doc.data()
      //       }
      //     })
      //   })
      // )
  }

  get offerDetails(): Offer {
    return this.offerDetail;
  }

  getdetOffers() {

    // console.log("========= offerdetails",this.offerDetail);
    return this.offerDetail?.name;
}


  isOfferOwner(ownerId?): boolean {
    //return this.offerDetail && this.offerDetail.currentUserOfferOwner;
    if (ownerId) {
      return ownerId === this.authService.getAuthInfo().userId;
    } else {
      return this.offerDetail && this.offerDetail.user.identityId === this.authService.getAuthInfo().userId;
    }
  }

  isDealReceiver(dealReceiverId?): boolean {
    //return this.offerDetail && this.offerDetail.currentUserOfferOwner;
    if (dealReceiverId) {
      return dealReceiverId === this.authService.getAuthInfo().userId;
    } else {
      return this.dealDetail && this.dealDetail.receiver.id === this.authService.getAuthInfo().userId;
    }
  }

  isOfferViewer(): boolean {
    return this.offerDetail && !this.offerDetail.currentUserOfferOwner;
  }

  chatOfferInitiate(input: {
    offerOwnerDetails: {
      identityId: string,
      name: string,
      imageUrl: string
    },
    chatInitiatorDetails: {
      identityId: string,
      name: string,
      imageUrl: string
    },
    offerId: string,
    roomId: string,
    isOfferOwner: boolean,
  }) {
    const offerOwnerDetails = input.offerOwnerDetails;
    const chatInitiatorDetails = input.chatInitiatorDetails;
    this.chatConnect.offerId = input.offerId;
    this.chatConnect.roomId = input.roomId;
    this.chatConnect.offerOwnerId = offerOwnerDetails.identityId || '';
    if (input.isOfferOwner) {
      this.chatConnect.senderId = offerOwnerDetails.identityId || '';
      this.chatConnect.senderName = offerOwnerDetails.name || '';
      this.chatConnect.recipientId = chatInitiatorDetails.identityId || '';
      this.chatConnect.isOfferOwner = true;
      this.chatConnect.receipentName = chatInitiatorDetails.name || '';
      this.chatConnect.receipentImage = chatInitiatorDetails.imageUrl || '';
    } else {
      this.chatConnect.senderId = chatInitiatorDetails.identityId || '';
      this.chatConnect.senderName = chatInitiatorDetails.name || '';
      this.chatConnect.recipientId = offerOwnerDetails.identityId || '';
      this.chatConnect.isOfferOwner = false;
      this.chatConnect.receipentName = offerOwnerDetails.name || '';
      this.chatConnect.receipentImage = offerOwnerDetails.imageUrl || '';
    }
    this.isChatConnected.next(true);
  }

  chatDealInitiate(input: {
    dealReceiverDetails: {
      identityId: string,
      name: string,
      imageUrl: string
    },
    dealSenderDetails: {
      identityId: string,
      name: string,
      imageUrl: string
    },
    dealId: string,
    roomId: string,
    isDealReceiver: boolean
  }) {
    const dealReceiverDetails = input.dealReceiverDetails;
    const dealSenderDetails = input.dealSenderDetails;
    this.chatConnect.dealId = input.dealId;
    this.chatConnect.roomId = input.roomId;
    if (input.isDealReceiver) {
      this.chatConnect.senderId = dealReceiverDetails.identityId || '';
      this.chatConnect.senderName = dealReceiverDetails.name || '';
      this.chatConnect.recipientId = dealSenderDetails.identityId || '';
      this.chatConnect.isDealReceiver = true;
      this.chatConnect.receipentName = dealSenderDetails.name || '';
      this.chatConnect.receipentImage = dealSenderDetails.imageUrl || '';
    } else {
      this.chatConnect.senderId = dealSenderDetails.identityId || '';
      this.chatConnect.senderName = dealSenderDetails.name || '';
      this.chatConnect.recipientId = dealReceiverDetails.identityId || '';
      this.chatConnect.isOfferOwner = false;
      this.chatConnect.receipentName = dealReceiverDetails.name || '';
      this.chatConnect.receipentImage = dealReceiverDetails.imageUrl || '';
    }
    this.isChatConnected.next(true);
  }

  sendMessage(message, chatType: ChatTypeEnums) {
    // chat with firestore
    let loggedInBusinessDetails: any = this.storageService.getSelectedBusiness();
    let entityBusinessDetails: any = chatType === ChatTypeEnums.offer ? this.offerDetail : this.dealDetail;
    this.setCollectionNames(chatType)
    const entityId = chatType === ChatTypeEnums.offer ? this.chatConnect.offerId : this.chatConnect.dealId;
    const roomId = this.chatConnect.roomId;
    const messageType = message.messageType || 'HTML';
    let jsonObject: chatOfferMessage | chatDealMessage | any = {
      isSent: true,
      isDelivered: true,
      isRead: false,
      senderId: this.chatConnect.senderId,
      senderBusinessMemberId: this.authService.currentUserId,
      recipientId: this.chatConnect.recipientId,
      recipientBusinessMemberId: null,
      roomId: this.chatConnect.roomId,
      messageType: messageType,
      messageBody: message.messageBody,
      messageTime: new Date().toISOString(),
      messageAttr: message.messageAttr || null,
      isReply: message.isReply,
      replyObj: message.replyObj,
    }
    if (chatType === ChatTypeEnums.offer) {
      jsonObject.offerId = entityId
    } else if (chatType === ChatTypeEnums.deal) {
      jsonObject.dealId = entityId
    }

    this.messageSendSub.next();

    this.fireStore.collection(this.mainCollection).doc(entityId).collection(this.roomCollection).doc(roomId).collection(this.msgCollection).add(jsonObject).then((res) => {
      // console.log(res);
      this.initialize();
      
      return res;
    }).catch((error) => {
      // console.log(error);
      this.initialize();
      return error;
    })
  }

  deleteMessageForMe({
    chatType,
    messageId,
    deletedForUserId,
    deletedForBusinessMemberId

  }: {
    chatType: ChatTypeEnums,
    messageId: string,
    deletedForUserId: string,
    deletedForBusinessMemberId?: string
  }){
    this.setCollectionNames(chatType)
    const entityId = chatType === ChatTypeEnums.offer ? this.chatConnect.offerId : this.chatConnect.dealId;
    const roomId = this.chatConnect.roomId;
    const currDoc = this.fireStore
              .collection(this.mainCollection)
              .doc(entityId)
              .collection(this.roomCollection)
              .doc(roomId)
              .collection(this.msgCollection)
              .doc(messageId);

              currDoc
              .valueChanges()
              .subscribe((res: chatOfferMessage | chatDealMessage | any) => {
                let users = [];
                let businessUsers = [];
                if(res.deletedForMe && Array.isArray(res.deletedForMe)){
                  if(res.deletedForMe.indexOf(deletedForUserId) === -1){
                    users = [...res.deletedForMe , deletedForUserId],
                    businessUsers = [...res.deletedForBusinessMember , deletedForBusinessMemberId]
                    currDoc.update({
                     deletedForMe: users,
                     deletedForBusinessMember: businessUsers
                   })
                  }
                } else {
                  users = [deletedForUserId];
                  businessUsers = [deletedForBusinessMemberId];
                  currDoc.update({
                    deletedForMe: users,
                    deletedForBusinessMember: businessUsers
                  })
                }
                
              })
  }

  blocUnblockkUser({
    chatType,
    blockUserId
  }:{
    chatType: ChatTypeEnums,
    blockUserId: string
  }){
    this.setCollectionNames(chatType)
    const entityId = chatType === ChatTypeEnums.offer ? this.chatConnect.offerId : this.chatConnect.dealId;
    const roomId = this.chatConnect.roomId;
    const currDoc = this.fireStore
              .collection(this.mainCollection)
              .doc(entityId)
              .collection(this.roomCollection)
              .doc(roomId)

              currDoc
              .get()
              .pipe(
                  map((res: any) => {
                    return {
                      id: res.id,
                      ...res.data()
                    }
                  })
              )
              .subscribe((res: chatOfferMessage | chatDealMessage | any) => {
                let users = [];
                if(res.isBlocked){
                    currDoc.update({
                     isBlocked: false,
                     blockedUserId: ''
                   })
                } else {
                  currDoc.update({
                    isBlocked: true,
                    blockedUserId: blockUserId
                  })
                }
                
              })
  }

  clearHistoryForCurrentUser({
    chatType,
    userId
  }:{
    chatType: ChatTypeEnums,
    userId: string
  }){
    this.setCollectionNames(chatType)
    const entityId = chatType === ChatTypeEnums.offer ? this.chatConnect.offerId : this.chatConnect.dealId;
    const roomId = this.chatConnect.roomId;
    const currDoc = this.fireStore
              .collection(this.mainCollection)
              .doc(entityId)
              .collection(this.roomCollection)
              .doc(roomId)
              .collection(this.msgCollection);
              
              
              currDoc.get()
              .pipe(
                map((res: any) => {
                  return {
                    id: res.id,
                    ...res.data()
                  }
                })
              )
              .subscribe((res: chatOfferMessage | chatDealMessage | any) => {
                for(let i=0;i<res.length;i++){
                  currDoc
                  .doc(res.id)
                  .get()
                  .pipe(
                    map((res: any) => {
                      return {
                        id: res.id,
                        ...res.data()
                      }
                    })
                  )
                  .subscribe((res: chatOfferMessage | chatDealMessage | any) => {
                    let users = [];
                    if(res.clearedBy && Array.isArray(res.clearedBy)){
                      if(res.clearedBy.indexOf(userId) === -1){
                        users = [...res.clearedBy , userId]
                        currDoc
                        .doc(res.id)
                        .update({
                          clearedBy: users
                        })
                      }
                    } else {
                      users = [userId];
                      currDoc
                      .doc(res.id)
                      .update({
                        clearedBy: users
                      })
                    }
                  })
                  }
              })
  }

  initialize(){
    this.isReply = false;
    this.replyObj = {
      orgMsgId: '',
      senderId: '',
      senderName: '',
      messageBody: '',
      messageType: '',
      messageAttr: []
    }
    this.totalUnreadCount = {
      [ChatTypeEnums.offer]: 0,
      [ChatTypeEnums.deal]: 0
    };
  }

  sendImageMessage(mediaMsg, mediaFiles, isVideo, chatType: ChatTypeEnums) {
    const entityId = chatType === ChatTypeEnums.offer ? this.chatConnect.offerId : ''
    const roomId = chatType === ChatTypeEnums.offer ? this.chatConnect.roomId : ''
    const messageType = isVideo ? 'VIDEO' : 'IMAGE';
    const mediaReq: any = {
      isSent: true,
      isDelivered: true,
      isRead: false,
      senderId: this.chatConnect.senderId,
      recipientId: this.chatConnect.recipientId,
      roomId: this.chatConnect.roomId,
      messageBody: mediaMsg,
      messageType: messageType,
      messageAttr: {
        mediaUrls: mediaFiles
      },
      messageTime: new Date().toISOString()
    };
    this.fireStore.collection(this.mainCollection).doc(entityId).collection(this.roomCollection).doc(roomId).collection(this.msgCollection).add(mediaReq).then((res) => {
      // console.log(res);
      return res;
    }).catch((error) => {
      // console.log(error);
      return error;
    })
  }

  // sendOfferMessage(offersObj, chatType: ChatTypeEnums) {
  //   const entityId = chatType === ChatTypeEnums.offer ?  this.chatConnect.offerId : ''
  //   const roomId = chatType === ChatTypeEnums.offer ?  this.chatConnect.roomId : ''
  //   const attachedOffers = offersObj.offers;
  //   if(attachedOffers.length) {
  //     attachedOffers.forEach(offer => {
  //       this.logger.log({
  //         message:'Send Offer Messages'
  //       })
  //       const messageId = uuid.v4();
  //       const offerReq: any = {
  //         isSent: true,
  //         isDelivered: true,
  //         isRead: false,
  //         senderId : this.chatConnect.senderId,
  //         recipientId: this.chatConnect.recipientId,
  //         roomId: this.chatConnect.roomId,              
  //         messageBody: '',
  //         messageType: 'OFFER',
  //         messageAttr: {
  //           offerUrl : [offer.images? offer.images.url : ''],
  //           offerName: [offer.name || ''],
  //           offerCondition: [offer.itemCondition || ''],           
  //           offerPrice: [offer.unitOfferValuation || 0],
  //           offerActive: [offer.activeSince || ''],
  //           offerId : [offer.offerId],        
  //         },
  //         messageTime: new Date().toISOString()
  //       };
  //       this.fireStore.collection(this.mainCollection).doc(entityId).collection(this.roomCollection).doc(roomId).collection(this.msgCollection).add(offerReq).then((res)=>{
  //         console.log(res);
  //         return res;
  //       }).catch((error)=>{
  //         console.log(error);
  //         return error;
  //       })
  //     });
  //   }        
  //   if(offersObj.msg)
  //   this.sendMessage(offersObj.msg);   
  // }

  formatMessage(chatHistoryMsg: any): any[] {
    let chatMsgArr = [];
    const msgKey = Object.keys(chatHistoryMsg);
    msgKey.forEach(key => {
      // chatMsgArr = [...chatMsgArr, ...chatHistoryMsg[key]]
      chatHistoryMsg[key].map((item: any) => {
        item.isSent = true;
      })
      chatMsgArr = [...chatMsgArr, {
        key,
        msg: [...chatHistoryMsg[key].reverse()]
      }]
    })
    this.logger.log({
      message: `Msg Array:::${chatMsgArr}`
    });
    return chatMsgArr.reverse();
  }

  setAllRoomUserDetails(rooms: any[]) {
    this.roomUserDetails = [...rooms];
    this.logger.log({
      moduleName: 'Chat Room User Details',
      message: 'Room User Details:::',
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

  getRoomDetails({
    entityId,
    roomId,
    chatType
  }: {
    entityId: string,
    roomId: string,
    chatType: ChatTypeEnums
  }): Observable<any> {
    // chat with api
    // const url: string = `${environment.serverUrl}${sharedApiUrls.getRoomDetails}/${roomId}`;
    // return this.httpClient.get<any>(url);

    // chat with firestore
    entityId = entityId || this.entityId;
    this.setCollectionNames(chatType);
    return this.fireStore.collection(this.mainCollection).doc(entityId).collection(this.roomCollection).doc(roomId)
    .valueChanges({idField: 'id'})
    // .snapshotChanges().pipe(
    //   map((res: any) => {
    //     return {
    //       id: res.payload.id,
    //       ...res.payload.data()
    //     }
    //   })
    // );
  }

  downloadFile(fileUrl) {
    this.httpClient.get(fileUrl, { responseType: 'blob' }).subscribe((blob) => {
      saveAs(blob, 'test.pdf');
    })
  }

  changeChatPoppupPage({
    chatPageType,
    chatType,
    entityId,
    roomId
  }: {
    chatPageType: string,
    chatType?: ChatTypeEnums
    entityId?: string,
    roomId?: string
  }) {
    this.chatPopupPage = chatPageType || 'chat-offer-deal';
    this.entityId = entityId || this.entityId;
    this.chatRoomId = roomId || this.chatRoomId;
    this.chatType = chatType || this.chatType;
  }

  fileUploadingStatus(status: boolean) {
    this.anyFileUploading = status;
  }

  changeChatModalType(type: string) {
    this.showChatModalType = type;
    if(type=='large'){
      this.chatTextCntForReadMore = 150;
    } else {
      this.chatTextCntForReadMore = 80;
    }
  }

  getRoomUnreadCount({ enitityId, roomId, chatType }: {
    enitityId: string,
    roomId: string,
    chatType: ChatTypeEnums
  }): Observable<any> {
    enitityId = enitityId || this.entityId
    this.setCollectionNames(chatType);
    return this.fireStore
      .collection(this.mainCollection)
      .doc(enitityId)
      .collection(this.roomCollection)
      .doc(roomId)
      .collection(this.msgCollection, (ref) => {
        return ref
          .where('isRead', '==', false)
          .where('recipientId', '==', this.authService.currentUserId)
        //.orderBy('messageTime', 'desc');
      })
      .valueChanges({idField: 'id'});
      // .snapshotChanges()
      // .pipe(
      //   debounceTime(500),
      //   map((e: any) => {
      //     return e.map((item) => {
      //       return {
      //         id: item.payload.doc.id,
      //         ...item.payload.doc.data()
      //       }
      //     })
      //   })
      // )
  }

  onReadChat({ entityId, roomId, messageId, chatType }: {
    entityId: string,
    roomId: string,
    messageId: string
    chatType: ChatTypeEnums
  }) {
    entityId = entityId || this.entityId;
    this.setCollectionNames(chatType);
    this.fireStore.collection(this.mainCollection)
      .doc(entityId)
      .collection(this.roomCollection)
      .doc(roomId)
      .collection(this.msgCollection)
      .doc(messageId)
      .update({
        isRead: true
      })
  }

  setCollectionNames(chatType: ChatTypeEnums) {
    this.mainCollection = chatCollectionObj[chatType].collectionName;
    this.roomCollection = chatCollectionObj[chatType].roomCollectionName;
    this.msgCollection = chatCollectionObj[chatType].meesageCollectionName;
  }

  setUnreadCount(chatType: ChatTypeEnums, value: number) {
    this.totalUnreadCount[chatType] = value;
    this.unreadCountUpdate.next(this.totalUnreadCount);
  }

  setOfflineOnlineStatus(status: UserOnlineStatus): Observable<any>{
     const firebaseFunSetMsg = this.angularFireFun.httpsCallable(FirebaseFunctions.setUserOnlineStatus);
     return firebaseFunSetMsg({
       status: status
     })
  }

  getOfflineOnlineStatus(userId?: string): Observable<any>{
    const id = userId || this.authService.currentUserId;
    const db = this.fireStore.collection(chatCollectionObj.userOnlineStatus.collectionName).doc(id)
    return db.valueChanges();
  }

  getCurrentUserOfflineOnlineStatus() {
      this.getOfflineOnlineStatus().subscribe((statusRes)=>{
        this.currentUserOfflineOnlineStatus = statusRes?.state || UserOnlineStatus.offline;
      }, (error)=>{
        // console.log(`user status error`, error);
      })
  }

  onlyTakeNewEntries(input:{
    alreadyHavingData: Array<any>,
    currentFirestoreResData: Array<any>, 
    comparingKey?: string
  }): Array<chatOfferMessage | chatDealMessage>{
    const checkingKey = input.comparingKey || 'id';
    const onlyNewMessages = [];
    input.currentFirestoreResData.map((currentFirestoreData)=>{
      const findItem = input.alreadyHavingData.find((historyMsg)=> historyMsg[checkingKey] === currentFirestoreData[checkingKey]);
      if(!findItem){
        onlyNewMessages.push(currentFirestoreData);
      }
    })
    return onlyNewMessages;
  }
}
