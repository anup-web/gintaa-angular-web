import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfferService } from '@gintaa/modules/offer/services/offer.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-offer-popup',
  templateUrl: './report-offer-popup.component.html',
  styleUrls: ['./report-offer-popup.component.scss']
})
export class ReportOfferPopupComponent implements OnInit {

  offerQnASubscriber: Subscription;
  offerReportSubscriber: Subscription;
  offerId: string = null;
  questionList: any = []
  errorMessage: string = null;

  constructor(
    private offerService: OfferService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data) {
      this.offerId = data.offerId;
    }
  }

  ngOnInit(): void {
    this.getDealQnA();
  }

  getDealQnA() {
    this.offerQnASubscriber = this.offerService.getReportOfferCategories()
      .subscribe(result => {
        if (result && Array.isArray(result) && result.length > 0) {
          const questionsTemp = result;
          const questions = questionsTemp.map((question: any) => {
            let question_temp = { ...question, selected: false }
            return question_temp
          });
          this.questionList = questions
        }
      });
  }

  closeDialog(action='failed') {
    this.dialogRef.close(action);
  }

  submit(data:any) {
    const questionAns = data?.questionAns ? data?.questionAns : [] ;
    const comment = data?.initiateDealComment ? data?.initiateDealComment : '';
    const abondonRequest = {
      reportCategoryNames: [],
      reportComment: comment,
      offerId: this.offerId
    };
    let invalidForm = true;
    if( questionAns && questionAns.length > 0){
      invalidForm = false;
      abondonRequest.reportCategoryNames = questionAns;
    }
    if(invalidForm){
      this.errorMessage = 'Please select atleast one reason to report this offer!';
    } else {
      this.offerReportSubscriber = this.offerService.addReportOffer(abondonRequest)
      .subscribe(result => {
        if (result['body']['code'] == '200') {
          this.closeDialog('success');
        } else {
            this.errorMessage = 'Failed to report offer, Please try again!!';
        }
      }, err => {
        this.errorMessage = 'Failed to report offer, Please try again!!';
      });
    }
  }

  ngOnDestroy() {
    try{
     this.offerQnASubscriber.unsubscribe();
     this.offerReportSubscriber.unsubscribe();
    } catch(err){
    }
   }

}
