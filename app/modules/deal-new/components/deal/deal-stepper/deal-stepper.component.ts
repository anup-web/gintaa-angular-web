import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-deal-stepper',
  templateUrl: './deal-stepper.component.html',
  styleUrls: ['./deal-stepper.component.scss']
})
export class DealStepperComponent implements OnInit {

  @Input('dealStatus') dealStatus: string;
  @Input('initiatorPaidAmount') initiatorPaidAmount: boolean = false;
  @Input('dealDeliveryMethod') dealDeliveryMethod: any;
  @Input('callerIsReceiver') callerIsReceiver: string;
  @Input('requestedOffers') requestedOffers: any[];
  @Input('offeredOffers') offeredOffers: any[];
  @ViewChild('cdkStepper') cdkStepper: any;
  updatedValue: boolean = true;
  optional: boolean = false;
  completed: boolean = true;
  selectedIndex: number = 0;
  dealSteps: any;
  constructor() { }

  ngOnInit(): void {
    try {
      if (this.dealDeliveryMethod?.id == 'Self' || this.dealDeliveryMethod?.id == 'IndiaPost') {
        const steps = [];
        let bullet = 1;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Initiated' });
        bullet++;
        if (this.dealStatus == 'REVISED') {
          steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Revised' });
          bullet++;
        }
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Accepted' });
        bullet++;
        if (this.dealDeliveryMethod?.id == 'IndiaPost') {
          steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'IndiaPost delivery' });
          bullet++;
        } else {
          if (this.showDeliveryPreference()) {
            steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Personal meet' });
          } else {
            steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Avail service' });
          }
        }
        bullet++;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Partially closed' });
        bullet++;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Closed' });

        if (this.dealStatus) {
          switch (this.dealStatus) {
            case 'INITIATED':
              steps[0] = this.markStepAsDone(steps[0], 'last');
              this.selectedIndex = 0;
              break;
            case 'REVISED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'ACCEPTED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'REPORTED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'REJECTED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'PARTIAL_CLOSED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1]);
              steps[2] = this.markStepAsDone(steps[2]);
              steps[3] = this.markStepAsDone(steps[3], 'last');
              this.selectedIndex = 3;
              break;
            case 'CLOSED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1]);
              steps[2] = this.markStepAsDone(steps[2]);
              steps[3] = this.markStepAsDone(steps[3]);
              steps[4] = this.markStepAsDone(steps[4], 'last');
              this.selectedIndex = 4;
              break;
            default:
              this.completed = true;
              break;
          }
          this.updatedValue = false;
        }
        this.dealSteps = steps;
      } else if (this.dealDeliveryMethod?.id == 'Junction') {
        const steps = [];
        let bullet = 1;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Initiated' });
        bullet++;
        if (this.dealStatus == 'REVISED') {
          steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Revised' });
          bullet++;
        }
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Accepted' });
        bullet++;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Visit junction' });
        bullet++;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Received' });
        bullet++;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Partially closed' });
        bullet++;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Closed' });
        bullet++;
        if (this.dealStatus) {
          switch (this.dealStatus) {
            case 'INITIATED':
              steps[0] = this.markStepAsDone(steps[0], 'last');
              this.selectedIndex = 0;
              break;
            case 'REVISED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'ACCEPTED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'REPORTED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'REJECTED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'PARTIAL_CLOSED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1]);
              steps[2] = this.markStepAsDone(steps[2]);
              steps[3] = this.markStepAsDone(steps[3]);
              steps[4] = this.markStepAsDone(steps[4], 'last');
              this.selectedIndex = 4;
              break;
            case 'CLOSED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1]);
              steps[2] = this.markStepAsDone(steps[2]);
              steps[3] = this.markStepAsDone(steps[3]);
              steps[4] = this.markStepAsDone(steps[4]);
              steps[5] = this.markStepAsDone(steps[5], 'last');
              this.selectedIndex = 5;
              break;
            default:
              this.completed = true;
              break;
          }
          this.updatedValue = false;
        }
        this.dealSteps = steps;
      } else {
        const steps = [];
        let bullet = 1;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Initiated' });
        bullet++;
        if (this.dealStatus == 'REVISED') {
          steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Revised' });
          bullet++;
        }

        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Accepted' });
        bullet++;
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Payment' });
        bullet++;
        if (this.dealStatus == 'PAYMENT_REFUND_NEEDED' || this.dealStatus == 'PAYMENT_REFUNDED' || this.dealStatus == 'SHIPMENT_FAILED') {
          if(this.dealStatus == 'PAYMENT_REFUNDED'){
            steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Refunded' });
          } else {
            steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Refund Initiated' });
          }
          bullet++;
        } else {
          steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Received' });
          bullet++;
        }
        steps.push({ optional: false, completed: false, updatedValue: false, bullet: bullet, text: 'Closed' });
        bullet++;
        if (this.dealStatus) {
          switch (this.dealStatus) {
            case 'INITIATED':
              steps[0] = this.markStepAsDone(steps[0], 'last');
              this.selectedIndex = 0;
              break;
            case 'REVISED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'ACCEPTED':
              if (this.chechPayment()) {
                steps[0] = this.markStepAsDone(steps[0]);
                steps[1] = this.markStepAsDone(steps[1]);
                steps[2] = this.markStepAsDone(steps[2], 'last');
                this.selectedIndex = 2;
              } else {
                steps[0] = this.markStepAsDone(steps[0]);
                steps[1] = this.markStepAsDone(steps[1], 'last');
                this.selectedIndex = 1;
              }
              break;
            case 'SHIPMENT_FAILED':
              if (this.chechPayment()) {
                steps[0] = this.markStepAsDone(steps[0]);
                steps[1] = this.markStepAsDone(steps[1]);
                steps[2] = this.markStepAsDone(steps[2]);
                steps[3] = this.markStepAsDone(steps[3], 'last');
                this.selectedIndex = 3;
              } else {
                steps[0] = this.markStepAsDone(steps[0]);
                steps[1] = this.markStepAsDone(steps[1], 'last');
                this.selectedIndex = 1;
              }
              break;
            case 'PAYMENT_REFUNDED':
              if (this.chechPayment()) {
                steps[0] = this.markStepAsDone(steps[0]);
                steps[1] = this.markStepAsDone(steps[1]);
                steps[2] = this.markStepAsDone(steps[2]);
                steps[3] = this.markStepAsDone(steps[3], 'last');
                this.selectedIndex = 3;
              } else {
                steps[0] = this.markStepAsDone(steps[0]);
                steps[1] = this.markStepAsDone(steps[1], 'last');
                this.selectedIndex = 1;
              }
              break;
            case 'PAYMENT_REFUND_NEEDED':
              if (this.chechPayment()) {
                steps[0] = this.markStepAsDone(steps[0]);
                steps[1] = this.markStepAsDone(steps[1]);
                steps[2] = this.markStepAsDone(steps[2], 'last');
                this.selectedIndex = 2;
              } else {
                steps[0] = this.markStepAsDone(steps[0]);
                steps[1] = this.markStepAsDone(steps[1], 'last');
                this.selectedIndex = 1;
              }
              break;
            case 'REPORTED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'REJECTED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1], 'last');
              this.selectedIndex = 1;
              break;
            case 'CLOSED':
              steps[0] = this.markStepAsDone(steps[0]);
              steps[1] = this.markStepAsDone(steps[1]);
              steps[2] = this.markStepAsDone(steps[2]);
              steps[3] = this.markStepAsDone(steps[3]);
              steps[4] = this.markStepAsDone(steps[4], 'last');
              this.selectedIndex = 4;
              break;
            default:
              this.completed = true;
              break;
          }
          this.updatedValue = false;
        }
        this.dealSteps = steps;
      }
    } catch (e) {
    }
  }

  chechPayment() {
    return this.initiatorPaidAmount;
  }

  markStepAsDone(value, node = '') {
    if (node == 'last') {
      value['optional'] = false;
      value['completed'] = false;
      value['updatedValue'] = true;
    } else {
      value['optional'] = false;
      value['completed'] = true;
      value['updatedValue'] = false;
    }
    return value;
  }

  ngAfterViewInit(): void {
    try {
      if (this.dealStatus) {
        this.cdkStepper.selectedIndex = this.selectedIndex;
        this.updatedValue = false;
      }
    } catch (e) {

    }
  }

  showDeliveryPreference() {
    let data1 = false;
    let data2 = false;
    if (this.offeredOffers && Array.isArray(this.offeredOffers)) {
      data2 = this.offeredOffers.some((offer) => offer.offerType == 'Item');
    }
    if (this.requestedOffers && Array.isArray(this.requestedOffers)) {
      data1 = this.requestedOffers.some((offer) => offer.offerType == 'Item');
    }
    if (data1 || data2) {
      return true;
    } else {
      return false;
    }
  }

}
