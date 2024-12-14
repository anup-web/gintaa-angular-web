import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';
import { Observable } from 'rxjs';
import { AddOfferCommentInput, DeleteOfferCommentInput, DeleteOfferCommentReplyInput, OfferCommentInput,
  AddOfferCommentReplyInput, 
  EditOfferCommentInput,
  EditOfferCommentReplyInput, OfferCommentReplyInput} from '../model/offer-comments.model';

@Injectable({
  providedIn: 'root'
})
export class OfferCommentService {

  constructor(private http: HttpClient) { }

  getAllComments(input: OfferCommentInput): Observable<any[]>{
    const url = `${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question/all?page=${input.page}&size=${input.size}`;
    return this.http.get<any[]>(url);
  }

  getAllCommentReplies(input: OfferCommentReplyInput): Observable<any[]>{
    const url = `${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question/${input.questionId}/replies?pageOffset=${input.page}&pageSize=${input.size}`;
    return this.http.get<any[]>(url);
  }

  addComment(input: AddOfferCommentInput){
    const url = `${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question`;
    const body = {
      question: input.question
    }
    return this.http.post<any[]>(url,body);
  }

  addCommentReply(input: AddOfferCommentReplyInput){
    const url = `${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question/${input.questionId}/reply`;
    const body = {
      comment: input.reply
    }
    return this.http.post<any[]>(url,body);
  }

  editComment(input: EditOfferCommentInput){
    const url = `${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question/${input.questionId}`;
    const body = {
      question: input.question
    }
    return this.http.put<any[]>(url,body);
  }

  editCommentReply(input: EditOfferCommentReplyInput){
    const url = `${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question/${input.questionId}/reply/${input.replyId}`;
    const body = {
      comment: input.reply
    }
    return this.http.put<any[]>(url,body);
  }

  deleteComment(input: DeleteOfferCommentInput){
    const url = `${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question/${input.questionId}`;
    return this.http.delete<any[]>(url);
  }

  deleteCommentReply(input: DeleteOfferCommentReplyInput){
    const url = `${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question/${input.questionId}/reply/${input.replyId}`;
    return this.http.delete<any[]>(url);
  }

  getReportResons(){
    const url = `${environment.serverUrl}${configUrls.offerCommentReportReasons}`;
    return this.http.get<any[]>(url);
  }

  reportQuestion(input: {
    offerId: string,
    type: string,
    questionId: string,
    description: string,
    reasons: Array<string>,
    replyId?: string
  }){
    let url = ``;
    if(input.type === 'COMMENT'){
      url = `${environment.serverUrl}${configUrls.offerCommentReport}${input.questionId}/report`;
    } else if(input.type === 'REPLY'){
      url =`${environment.serverUrl}${configUrls.offerComments}${input.offerId}/question/${input.questionId}/reply/${input.replyId}/report`;
    }
    
    const body = {
      description: input.description,
      reasons: input.reasons
    }
    return this.http.post<any[]>(url,body);
  }

  
}
