import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-deal-delivery',
  templateUrl: './deal-delivery.component.html',
  styleUrls: ['./deal-delivery.component.scss']
})
export class DealDeliveryComponent implements OnInit {

  @Input('dealRejected') dealRejected: any;
  @Input('dealDetails') dealDetails: any;
  constructor() {}
  
  ngOnInit(): void {
   
  }

  whoModified(your= true){
    const triggeredByUserId = this.dealDetails?.triggeredByUserId;
    const isLastModifier = this.isLastModifier(triggeredByUserId);
    if(isLastModifier){
      return your ? 'Your' : 'You';
    } else {
      if (this.dealDetails?.callerIsReceiver) {
        return this.dealDetails?.sendingBusinessInfo?.name ? this.dealDetails?.sendingBusinessInfo?.name : this.dealDetails?.sender?.name;
      } else {
        return this.dealDetails?.receivingBusinessInfo?.name ? this.dealDetails?.receivingBusinessInfo?.name : this.dealDetails?.receiver?.name;
      }
    }
  }
  isLastModifier(triggeredByUserId){
    if (this.dealDetails?.callerIsReceiver) {
      return this.dealDetails?.receiver?.id == triggeredByUserId;
    } else {
      return this.dealDetails?.sender?.id == triggeredByUserId;
    }
  }
}
