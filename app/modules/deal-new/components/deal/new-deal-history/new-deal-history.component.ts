import { Component, OnInit, Input} from '@angular/core';
import Moment from 'moment';

@Component({
  selector: 'app-new-deal-history',
  templateUrl: './new-deal-history.component.html',
  styleUrls: ['./new-deal-history.component.scss']
})
export class NewDealHistoryComponent implements OnInit {

  @Input('revisionDeltaChanges') revisionDeltaChanges: any;
  @Input('dealDetails') dealDetails: any;

  constructor() { }

  ngOnInit(): void {
  }

  dealStatus(dealStatusCode:any){
    let result = '';
    switch(dealStatusCode?.newValue){
      case 'INITIATED':
        result = 'Initiated';
        break;
      case 'REVISED':
        result = 'Revised';
        break;
      case 'ACCEPTED':
        result = 'Accepted';
        break;
      case 'REJECTED':
        result = 'Rejected';
        break;
      case 'ABANDONED':
        result = 'Abandoned';
        break;
      case 'REPORTED':
        result = 'Reported';
        break;
      case 'PARTIAL_CLOSED':
        result = 'Partially Closed';
        break;
      case 'CLOSED':
        result = 'Closed';
        break;
    }
    return result;
  }
  getLocalTime(utcDateTime){
    if(utcDateTime){
      const locatDateTime = Moment.utc(utcDateTime).toDate();
      const localDate = Moment(locatDateTime).format('ll');
      const localTime = Moment(locatDateTime).format('h:mm a');
      return localDate + ' ' + localTime;
    }
  }
  whoModified(triggeredByUserId){
    const isLastModifier = this.isLastModifier(triggeredByUserId);
    if(isLastModifier){
      return 'You';
    } else {
      if (this.dealDetails?.callerIsReceiver) {
        return this.dealDetails?.sendingBusinessInfo?.name ? this.dealDetails?.sendingBusinessInfo?.name : this.dealDetails?.sender?.name;
      } else {
        return this.dealDetails?.receivingBusinessInfo?.name ? this.dealDetails?.receivingBusinessInfo?.name : this.dealDetails?.receiver?.name;
      }
    }
  }
  shhowBuyer(){
    return this.dealDetails?.sendingBusinessInfo?.name ? this.dealDetails?.sendingBusinessInfo?.name : this.dealDetails?.sender?.name;
  }
  isLastModifier(triggeredByUserId){
    if (this.dealDetails.callerIsReceiver) {
      return this.dealDetails.receiver.id == triggeredByUserId;
    } else {
      return this.dealDetails.sender.id == triggeredByUserId;
    }
  }
  showShipping(shipping){
    if(shipping?.id == 'Self'){
      return 'personal meet'
    } else {
      return shipping?.name;
    }
  }
  getJintaaContact(phoneNumber:any){
    if(phoneNumber && Array.isArray(phoneNumber)){
      return phoneNumber.join(', ')
    } else {
      return '';
    }
  }

}
