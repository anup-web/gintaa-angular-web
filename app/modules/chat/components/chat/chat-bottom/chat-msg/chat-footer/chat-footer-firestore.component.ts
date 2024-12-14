import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService, LoggerService } from '@gintaa/core/services';

import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';


import * as uuid from 'uuid';


import { ChatMessageTypeEnums, chatOfferRoom, ChatTypeEnums, chatFileSaveFolderName } from '@gintaa/shared/models';
import { AngularFireStorage } from '@angular/fire/storage';
;
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder'; 
import { ProfileService } from '@gintaa/modules/profile/services/profile.service';
import { StorageService } from '@gintaa/core/services/storage.service';
import { ChatAttachImageComponent } from '../../chat-attach-image/chat-attach-image.component';
import { ChatAttachAudioComponent } from '../../chat-attach-audio/chat-attach-audio.component';
import { ChatAttachOffersComponent } from '../../chat-attach-offers/chat-attach-offers.component';
@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss']
})
export class ChatFooterComponent implements OnInit {

  @ViewChild('message',{ static: false}) message: any;
  documentfiles = [];

  @ViewChild("documentUpload", { static: false }) documentUpload: ElementRef;
  @ViewChild("documentUploadForm", { static: false }) documentUploadForm: ElementRef;

  chatImageFiles = [];
  @ViewChild("imageUpload", { static: false }) imageUpload: ElementRef;
  @ViewChild("imageUploadForm", { static: false }) imageUploadForm: ElementRef;

  chatVideoFiles = [];
  @ViewChild("videoUpload", { static: false }) videoUpload: ElementRef;
  @ViewChild("videoUploadForm", { static: false }) videoUploadForm: ElementRef;

  @Input() connect: any = null;
  fileUploadSub$: Subscription;
  downloadUrl: Observable<any>;
  loggedInUserId: string;
  isShowEmojis: boolean = false;
  isVoiceRecordStarted: boolean = false;
  audioSource: any;
  time: any = {
    hour: 0,
    min: 0,
    sec: 0
  }
  timeInterval: any;
  isBlink: boolean = false;
  recipientId: string;
  loggedInBusinessId: string;
  constructor(public matDialog: MatDialog,
    public chatService: ChatService,
    private logger: LoggerService,
    private fireStorageService: AngularFireStorage,
    private authService: AuthService,
    private audioRecorderService: NgAudioRecorderService,
    private profileService: ProfileService,
    private storageService: StorageService) {
     }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.currentUserId;
    let loggedInBusinessDetails: any = this.storageService.getSelectedBusiness();
    this.loggedInBusinessId = loggedInBusinessDetails?.businessId;
    this.audioRecorderService.recorderError.subscribe((error)=>{
      //  console.log(error);
    })
    this.chatService.isChatConnected.subscribe((res)=>{
      this.recipientId = this.chatService.chatConnect.recipientId;
    })
  }


  chatAudioDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '760px';
    dialogConfig.data = {};

    const modalDialog = this.matDialog.open(ChatAttachAudioComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
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
    const modalDialog = this.matDialog.open(ChatAttachImageComponent, dialogConfig);
  }

  sendMessage() {
    const message = this.message.nativeElement.value.trim();
    if(message.length==0)
      return;
    const msgObj = {
      messageType: ChatMessageTypeEnums.HTML,
      messageBody: message
    }  
    this.sendMsgToConnectedRooms(msgObj);
    this.message.nativeElement.value = '';
    this.isShowEmojis=false;
  }


  uploadDocument({
    fileType
  }) {
    this.documentUpload.nativeElement.click();
    this.documentfiles = [];
    const documentUpload = this.documentUpload.nativeElement;
    documentUpload.onchange = () => {
      this.uploadDocumentFiles(documentUpload, fileType);
    };
  }

  uploadDocumentFiles(fileUpload: any, fileType: string) {
    this.logger.log({
      moduleName : 'Chat SideBar Upload Document:::',
      message: `File Details::::${fileUpload}`
    });
    for (let index = 0; index < fileUpload.files.length; index++) {
      const file = fileUpload.files[index];
      this.documentfiles.push({ data: file, inProgress: false, progress: 0 });
    }
    if(this.documentfiles.length) {
      this.documentfiles.forEach((file) => {
        this.uploadDocumentFile(file, fileType);
      });
    }
  }

  private uploadDocumentFile(file: any, fileType: string) {
    this.chatService.fileUploadingStatus(true);
    const filePath = `${chatFileSaveFolderName}${uuid.v4()}`;
    const fileRef = this.fireStorageService.ref(filePath);
    const task = this.fireStorageService.upload(filePath,file.data);
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((downloadUrl)=>{
            // console.log(downloadUrl);
            this.chatService.fileUploadingStatus(false);
            this.chatService.stopProgressBar();
            const documentReq: any = {
              messageBody: file.data.name,
              messageType: ChatMessageTypeEnums.FILE,
              messageAttr: {
                mediaUrls: [downloadUrl]
              }
            };
            this.sendMsgToConnectedRooms(documentReq);
          
          },(error: any)=>{
            this.logger.log({
                    message: `Error:::${error}`
                  });
          },()=>{
            // console.log('hii');
          })
        })
      ).subscribe((res)=>{
        // console.log(res);
      },(error: any)=>{
        this.logger.log({
                message: `Error:::${error}`
              });
      },()=>{
        // console.log('hii');
      })
  }

  uploadChatImage() {   
    this.chatImageFiles = [];    
    const upload = this.imageUpload.nativeElement as HTMLInputElement;
    upload.onchange = ($event) => {
      this.openChatImageModal(upload.files, $event);
    };
    upload.click();
  }

  uploadChatVideo() {
    this.chatVideoFiles = []; 
    const upload = this.videoUpload.nativeElement as HTMLInputElement;
    upload.onchange = ($event) => {
      this.openChatImageModal(upload.files, $event, true);
    };
    upload.click();
  }

  openChatImageModal(files: any, $event: any, isVideo?: boolean) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'image-chat-component';
    dialogConfig.position = {
      top: '10px'     
    };
    dialogConfig.height = 'auto';
    dialogConfig.width = '500px';
    dialogConfig.data = { files, event: $event, isVideo };
    const modalDialog: MatDialogRef<ChatAttachImageComponent, any> = this.matDialog.open(ChatAttachImageComponent, dialogConfig);
    
    modalDialog.afterClosed().subscribe(result => {
      if(isVideo) {
        this.videoUpload.nativeElement.value = '';
      } else {
        this.imageUpload.nativeElement.value = '';
      }
      if(result.closeImagePopUp) {
        return false;
      }
      this.chatService.startProgressBar();
      this.chatService.fileUploadingStatus(true);
      const mediaMsg = result.msg;
      for(let i=0;i<= result.files.length-1;i++){
        const file = result.files[i].file;
        const filePath = `${chatFileSaveFolderName}${uuid.v4()}`;
        const fileRef = this.fireStorageService.ref(filePath);
        const task = this.fireStorageService.upload(filePath,file);

        // observe percentage changes
        //this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((downloadUrl)=>{
                // console.log(downloadUrl);
                if(isVideo) {
                  this.chatVideoFiles.push(downloadUrl);                    
                } else {
                  this.chatImageFiles.push(downloadUrl);
                }
                if(result.files.length === this.chatVideoFiles.length +  this.chatImageFiles.length){
                  this.chatService.fileUploadingStatus(false);
                  this.chatService.stopProgressBar();
                  const mediaFiles = isVideo ? this.chatVideoFiles : this.chatImageFiles;
                  const mediaReq: any = {
                    messageBody: mediaMsg,
                    messageType: isVideo
                                 ? ChatMessageTypeEnums.VIDEO 
                                 : ChatMessageTypeEnums.IMAGE,
                    messageAttr: {
                      mediaUrls : mediaFiles
                    },
                  };
                  this.sendMsgToConnectedRooms(mediaReq);
                }
              },(error: any)=>{
                this.logger.log({
                        message: `Error:::${error}`
                      });
              },()=>{
                // console.log('hii');
              })
            })
        )
        .subscribe((res: any)=>{
          //  console.log(res);
          //  console.log(this.downloadUrl);
          
        },(error: any)=>{
          this.logger.log({
                  message: `Error:::${error}`
                });
        },()=>{
          // console.log('hii');
        })
      }
    });
  }

  attachOffer() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'offer-chat-component';
    dialogConfig.position = {
      top: '0px',
      right: '0px',
    };
    // dialogConfig.backdropClass = 'image-dialog-class';
    dialogConfig.height = 'auto';
    dialogConfig.width = '1170px';
    dialogConfig.data = {
        name: 'CHAT_OFFER',
    };
    const modalDialog = this.matDialog.open(ChatAttachOffersComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      if(results.closeOfferPopUp) {
        return false;
      }
      results.offers?.forEach(offer => {
        this.logger.log({
          message:'Send Offer Messages'
        })
        const offerReq: any = {           
          messageBody: 'Attached a listing',
          messageType: ChatMessageTypeEnums.OFFER,
          messageAttr: {
            offerUrl : offer.images? offer.images.url : '',
            offerName: offer.name || '',
            offerCondition: offer.itemCondition || '',           
            offerPrice: offer.unitOfferValuation || 0,
            offerActive: offer.activeSince || '',
            offerId : offer.offerId,        
          },
          messageTime: new Date().toISOString()
        }; 
          this.sendMsgToConnectedRooms(offerReq);  
      })   
    });
  }

  sendMsgToConnectedRooms(msgObj: any){
    if(this.chatService.chatConnectedRooms.length>0){
      for(let i=0; i< this.chatService.chatConnectedRooms.length; i++){
        const roomDetails = this.chatService.chatConnectedRooms[i];
        switch(this.chatService.chatType){
          case ChatTypeEnums.offer:
            this.chatOfferInitiate(roomDetails);
            break;
          case ChatTypeEnums.deal:
            this.chatDealInitiate(roomDetails); 
            break;
          default:
            this.chatOfferInitiate(roomDetails); 
            break;
        }
        msgObj.roomId = roomDetails.id,
        msgObj.isReply = this.chatService.isReply;
        msgObj.replyObj = this.chatService.replyObj;
        this.chatService.sendMessage(msgObj, this.chatService.chatType);
      }
    }
  }

  chatOfferInitiate(roomDetails){
    this.chatService.chatOfferInitiate({
      ...roomDetails,
        roomId: roomDetails.id,
        offerId: roomDetails.offerId || this.chatService.offerId || this.chatService.offerDetail.offerId,
        isOfferOwner: (roomDetails.offerOwnerDetails.identityId === this.authService.currentUserId || roomDetails.offerOwnerDetails.identityId === this.loggedInBusinessId)
    })
  }

  chatDealInitiate(roomDetails){
    this.chatService.chatDealInitiate({
      dealReceiverDetails: roomDetails.dealReceiverDetails,
      dealSenderDetails: roomDetails.chatInitiatorDetails.identityId === roomDetails.dealReceiverDetails.identityId ? roomDetails.chatReceiverDetails : roomDetails.chatInitiatorDetails,
      roomId: roomDetails.id,
      dealId: roomDetails.dealId || this.chatService.dealId || this.chatService.dealDetail.dealRefId,
      isDealReceiver:  this.chatService.dealDetail.receiver.id === this.authService.currentUserId
    })
  }

  unBlockChat(){
    // const blockUserId = this.chatService.chatConnect.recipientId;
    // this.chatService.blocUnblockkUser({
    //   chatType: this.chatService.chatType,
    //   blockUserId: blockUserId
    // });
    this.profileService.unBlockUserProfile(this.recipientId)
    .subscribe((res)=>{
      this.chatService.loggedInUserAllStatus.alreadyCallerHasBlockUser = false;
    },(err)=>{
      // console.log(err);
    })
  }

  addEmoji(event){
    // console.log(event);
    this.message.nativeElement.value += event.emoji.native;
    this.message.nativeElement.focus();
  }


  showEmoji(){
    this.isShowEmojis=!this.isShowEmojis;
    this.message.nativeElement.focus();
  }

  startRecording(){
    this.isBlink = true;
    this.isVoiceRecordStarted = true;
    this.audioRecorderService.startRecording();
    this.timeInterval = setInterval(()=>{
      this.isBlink = !this.isBlink;
      if(this.time.sec===59){
        this.time.sec = 0;
        if(this.time.min === 59){
          this.time.min = 0;
          this.time.hour++
        } else {
          this.time.min++;
        }
      } else {
        this.time.sec++;
      }
    },1000)
  }

  cancelRecording(){
    this.clearTimeInterval();
    this.isVoiceRecordStarted = false;
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB);
  }

  stopRecording(){
    const recordingTime = this.time;
    this.clearTimeInterval();
    this.chatService.startProgressBar();
    this.chatService.fileUploadingStatus(true);
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((blobData: Blob)=>{
      this.isVoiceRecordStarted = false;
      // console.log(blobData);
      const file = new File([blobData], "voice.mp3")
      this.audioSource = URL.createObjectURL(file)
      const filePath = `${chatFileSaveFolderName}${uuid.v4()}`;
      const fileRef = this.fireStorageService.ref(filePath);
      const task = this.fireStorageService.upload(filePath,file);
      task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((downloadUrl)=>{
              // console.log(downloadUrl);
              this.chatService.fileUploadingStatus(false);
              this.chatService.stopProgressBar();
              const mediaFiles = [downloadUrl];
              const mediaReq: any = {
                messageBody: '',
                messageType: ChatMessageTypeEnums.AUDIO_RECORDING, 
                messageAttr: {
                  senderImage: [this.authService.currentUserImage],
                  mediaUrls : mediaFiles
                },
              };
              this.sendMsgToConnectedRooms(mediaReq);
            },(error: any)=>{
              this.logger.log({
                      message: `Error:::${error}`
                    });
            })
          })
      )
      .subscribe((res: any)=>{
          // console.log(res);
      },(error: any)=>{
        this.logger.log({
                message: `Error:::${error}`
              });
      })
    }).catch((error)=>{
      // console.log(error);
    })
  }

  clearTimeInterval(){
    this.isBlink = false;
     clearInterval(this.timeInterval);
     this.time = {
       hour: 0,
       min: 0,
       sec: 0
     }
  }

  getTime(){
    const hours = this.time.hour>9? this.time.hour : '0'+this.time.hour;
    const min = this.time.min>9? this.time.min: '0'+this.time.min;
    const sec = this.time.sec>9? this.time.sec: '0'+this.time.sec;
    return `${min}:${sec}`
  }
}
