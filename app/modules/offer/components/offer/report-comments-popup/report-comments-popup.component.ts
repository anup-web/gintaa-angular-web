import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OfferCommentService } from '@gintaa/modules/offer/services/offer-comment.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-report-comments-popup',
  templateUrl: './report-comments-popup.component.html',
  styleUrls: ['./report-comments-popup.component.scss']
})
export class ReportCommentsPopupComponent implements OnInit {

  reasons: any= [];
  selectedReasons = [];
  errMsg: string = '';
  textReason: string = '';
  constructor(private dialogRef: MatDialogRef<any>,
    private offerCommentService: OfferCommentService) { }

  ngOnInit(): void {
    // this.reasons$ = [{id: '1',
    //                 name: 'test'
    //                   },{
    //                   id: '2',
    //                   name: 'test2'
    //                 },{
    //                 id: '3',
    //                 name: 'test3'
    //              }];
    this.offerCommentService.getReportResons()
      .subscribe((res: any)=>{
        // console.log(res);
        this.reasons = res.payload;
      })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  clickReason(id){
    this.reasons.map((item)=>{
        if(item.reasonId === id) 
          item.checked = item.checked? !item.checked : true;
    })
    const res: Array<any> = this.reasons.filter((item)=> item.checked === true).map((item)=>item.reasonId);
    if(res.length > 0){
      this.errMsg = '';
    } 
  }

  sendReport(reasonEvent){
    const res: Array<any> = this.reasons.filter((item)=> item.checked === true).map((item)=>item.reasonId);
    if(res.length === 0 && reasonEvent.value.trim().length ===0){
      this.errMsg = 'Please select any option or write reason!!';
      return;
    } 
    this.errMsg = '';
    const input = {
      reason: this.reasons.filter((item)=> item.checked === true).map((item)=>item.reasonId),
      desc: reasonEvent.value
    }
    this.dialogRef.close(input);
  }

  editTextReason(reasonEvent){
    if(reasonEvent.trim().length > 0){
      this.errMsg = '';
    } 
  }

}
