import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { selectOfferCommentState } from '@gintaa/modules/offer/store/offer-comments/offer-comment.selector';
import { DeafaultOfferCommenttNoImage, defaultNoImage } from '@gintaa/shared/configs/default.config';
import { Store } from '@ngrx/store';
import * as offerCommentAction from '../../../store/offer-comments/offer-comment.actions';
import * as moment from 'moment';
import { AuthService } from '@gintaa/core/services/auth.service';
import { defaultOfferCommentConfig } from '@gintaa/modules/offer/config/default.config';


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ReportCommentsPopupComponent } from '@gintaa/modules/offer/components/offer/report-comments-popup/report-comments-popup.component';
import { OfferCommentService } from '@gintaa/modules/offer/services/offer-comment.service';
import { SharedService } from '@gintaa/shared/services/shared.service';

@Component({
  selector: 'app-offers-comments',
  templateUrl: './offers-comments.component.html',
  styleUrls: ['./offers-comments.component.scss']
})
export class OffersCommentsComponent implements OnInit {
  @ViewChild('msg') msg: ElementRef;
  @ViewChild('replyMsg') replyMsg: ElementRef;
  @ViewChild('editMsg') editMsg: ElementRef;
  @ViewChild('editMsgReply') editMsgReply: ElementRef;
  askQuestion: boolean = false;
  askEditQuestion: number = -1;
  askEditReply: number = -1;
  replyQuestionId = '';
  noProfileImage: string = defaultNoImage;
  username: string = '';
  @Input('offerDetail') offerDetail: any;
  comments: any = [];
  qustionPage = defaultOfferCommentConfig.questionPage;
  replyPage = defaultOfferCommentConfig.replyPage;
  isShowMoreComments: boolean = true;
  isShowMoreReplies: boolean = true;
  showReplyIndex: string;
  showEditQuestionIndex: string;
  showEditReplyIndex: string;
  editComments: any;
  replyMessages: any;
  editReplyMessages: any;
  errMsg: string = '';
  sucMsg: string = ''
  menu: any;
  textLimitCnt: number = 130;
  isShowReadMoreQuestion = {};
  isShowReadMoreReply = {};
  commentNoProfileImage = DeafaultOfferCommenttNoImage.commentSection;
  replyNoProfileImage = DeafaultOfferCommenttNoImage.replySection;
  constructor(private store: Store,
    private authService: AuthService,
    public matDialog: MatDialog,
    private offerCommentsService: OfferCommentService,
    private sharedService: SharedService) { }

 


  ngOnInit(): void {
    this.reset();
    this.store.select(selectOfferCommentState).subscribe((authState)=>{
       this.comments = authState.comments;
       this.isShowMoreComments = authState.isNextPageDataAvailable;
       this.reset();
    })
    this.getAllComments();
  }

  getAllComments(){
    const input = {
      offerId: this.offerDetail.offerId,
      page: this.qustionPage,
      size: defaultOfferCommentConfig.qustionSize
    }
    this.store.dispatch(offerCommentAction.getOfferComment({
      payload: input
    }));
  }

  getTime(timestamp){
     return moment(timestamp).format('D MMM Y');
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  fetchShortUserName() {
    const isAuth = this.authService.isAuthenticated();
    if (isAuth) {
      this.username = this.authService.getAuthInfo().username;
    }
    if (this.username) {
      return this.username.split(' ')[0];
    } else {
      return ' Guest';
    }
  }

  fetchProfilePhoto() {
    const isAuth = this.authService.isAuthenticated();
    if (isAuth) {
      const providerData = this.authService.getAuthInfo().providerData;
      if(providerData.length>0){
        return providerData[0].photoUrl || defaultNoImage;
      }
    } else {
      return defaultNoImage;
    }
  }

  sendQuestionMsg(){
    const input = {
      offerId: this.offerDetail.offerId,
      question:  this.msg.nativeElement.value
    }
    this.store.dispatch(offerCommentAction.addOfferComment({
      payload: input
    }))
    this.msg.nativeElement.value = '';
  }

  sendReplyMsg(key){
    const input = {
      offerId: this.offerDetail.offerId,
      questionId: key,
      reply: this.replyMessages[key]
    }
    this.store.dispatch(offerCommentAction.addOfferCommentReply({
      payload: input
    }))
    this.replyMessages[key] = '';
  }

  deleteComment(type, questionId, replyId=''){
    const input = {
      offerId: this.offerDetail.offerId,
      questionId,
      replyId
   }
    switch(type){
      case 'COMMENT':
        this.store.dispatch(offerCommentAction.deleteOfferComment({
          payload: input
        }))
        break;
      case 'REPLY':
        this.store.dispatch(offerCommentAction.deleteOfferCommentReply({
          payload: input
        }))
        break;

    }
  }

  getAskQuestion(){
    this.reset();
    this.askQuestion=true;
  }

  getAskReply(comment: any, index: string){
    this.reset();
    this.showReplyIndex = index;
    this.replyMessages[index]= '';
  }

  editQuestion(comment: any, index: string){
    this.reset();
    this.showEditQuestionIndex = index;
    this.editComments[index] = comment.question;
  }

  editReply(reply: any,index: string){
    this.reset();
    this.showEditReplyIndex = index;
    this.editReplyMessages[index] = reply.comment;
  }

  sendEditQuestion(comment,index){
    // console.log(index, this.editComments);
    const input = {
      offerId: this.offerDetail.offerId,
      questionId: comment.threadId,
      question: this.editComments[index]
    }
    this.store.dispatch(offerCommentAction.editOfferComment({
      payload: input
    }))
    this.editComments[index] = '';
  }

  sendEditReply(reply,qId, index){
    const input = {
      offerId: this.offerDetail.offerId,
      questionId: qId,
      replyId: reply.replyId,
      reply: this.editReplyMessages[index]
    }
    this.store.dispatch(offerCommentAction.editOfferCommentReply({
      payload: input
    }))
    this.editReplyMessages[index] = '';
  }

  getQuestionNextPageData(){
    this.qustionPage++;
    const input = {
      offerId: this.offerDetail.offerId,
      page: this.qustionPage,
      size: defaultOfferCommentConfig.qustionSize
    }
    this.store.dispatch(offerCommentAction.loadMoreOfferComment({
      payload: input
    }));
  }

  getReplyNextPageData(questionId: string, replyLength: number){
    this.replyPage = replyLength + 1;
    const input = {
      offerId: this.offerDetail.offerId,
      questionId: questionId,
      page: this.replyPage,
      size: defaultOfferCommentConfig.replySize
    }
    this.store.dispatch(offerCommentAction.loadMoreOfferCommentReply({
      payload: input
    }));
  }

  openReportDialog(type,comment, reply?) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {};

    const modalDialog = this.matDialog.open(ReportCommentsPopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
      if(results){
        const input = {
          offerId: this.offerDetail.offerId,
          type: type,
          questionId: comment.threadId,
          replyId: reply?.replyId,
          description: results.desc,
          reasons: results.reason
        }

        this.offerCommentsService.reportQuestion(input)
            .subscribe((res)=>{
              //  console.log(res);
              //  this.errMsg = '';
              //  this.sucMsg = 'Report submitted successfully!!';
               this.sharedService.showToaster('Report submitted successfully!!', 'success');
               this.getAllComments();
            },(err)=>{
              // console.log(err);
              // this.sucMsg = '';
              // this.errMsg = err?.message || err?.error?.message || 'An error occured!!';
              this.sharedService.showToaster(err?.message || err?.error?.message || 'An error occured!!', 'warning');
            })
    
        // this.store.dispatch(offerCommentAction.reportQuestion({
        //   payload: input
        // }));
      }
    });
  }

  cancelComment(){
    this.reset();
  }

  startTyping(type: string){
    if(this.msg && this.msg.nativeElement && this.msg.nativeElement.value){
      let valLength = this.msg.nativeElement.value.length;
      // console.log("valLength "+ valLength );
    }
  }

  getCurrentUserId(){
    return this.authService.currentUserId;
  }

  getCurrentUserName(){
    return this.authService.currentUserName;
  }

  getCurrentUserImage(){
    return this.authService.currentUserImage;
  }

  reset(){
    this.askQuestion=false;
    this.showReplyIndex = '';
    this.showEditReplyIndex = '';
    this.showEditQuestionIndex = '';
    this.editComments = {};
    this.replyMessages = {};
    this.editReplyMessages = {};
    this.errMsg = '';
    this.sucMsg = '';
  }
}
