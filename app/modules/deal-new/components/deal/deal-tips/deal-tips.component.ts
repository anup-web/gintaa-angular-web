import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deal-tips',
  templateUrl: './deal-tips.component.html',
  styleUrls: ['./deal-tips.component.scss']
})
export class DealTipsComponent implements OnInit {

  @Input('showTips') showTips: any = '';
  thirdpartyTips: any = [
    'Engage in meaningful communication with the other party.',
    'Select hassle-free doorstep delivery.',
    'Secure your delivery with gintaa assurance.',
    'Don’t forget to check your product after delivery.',
    'Encrypted, secured payment gateway available. '
  ];
  junctionTips: any = [
    'Gintaa pairs up with prominent cafes and restaurants as gintaa junctions.',
    'Choose gintaa junctions for safe transactions.',
    'Our gintaa junctions are located in proper hub areas.',
  ];
  outgoingTips: any = [
    'Communicate properly with the other party.',
    'Choose a safe and secured place for personal meetings.',
    'Don’t forget to check the product quality.',
    'Check and confirm the offer history before proceeding.',
  ];
  incomingTips: any = [
    'Use the chat option for better negotiations.',
    'Verify offer details before accepting it.',
    'Do not click on any suspicious links to receive payment.',
  ];
  acceptedJunction: any = [
    'Meet the other party at a convenient gintaa junction. ',
    'Do not forget to check product condition before closing the offer. ',
    'Report if you have serious concerns related to the offer.',
    'Exchange ‘close offer code’ to complete the transaction.'
  ];
  acceptedThirdpartyBuyer: any = [
    'Communicate properly with the other party.',
    'Do not forget to check product condition after delivery.',
    'Pay through our secured payment gateway.',
  ];
  reviseOffer: any = [
    'Customize your offer by revising it.',
    'Keep the number of revisions minimal for better acceptance. ',
    'Check and confirm the updated offer before acceptance.',
  ];
  ratingOffer: any = [
    'Ratings available for delivery, gintaa junction and user experience.',
    'Please provide your valuable feedback. ',
  ];


  constructor() { }

  ngOnInit(): void {
  }

  showTipsCheck() {
    if (this.showTips && (this.showTips == 'Junction' || this.showTips == 'Shipping' || this.showTips == 'outgoing' || this.showTips == 'incomming' || this.showTips == 'acceptedJunction' || this.showTips == 'acceptedThirdpartyBuyer' || this.showTips == 'reviseOffer' || this.showTips == 'ratingOffer')) {
      return true;
    } else {
      return false;
    }
  }

}
