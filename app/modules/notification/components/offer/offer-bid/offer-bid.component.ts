import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FcmService } from '@gintaa/core/services/fcm.service';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
import { OfferService } from '@gintaa/shared/services';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-offer-bid',
  templateUrl: './offer-bid.component.html',
 styleUrls: ['./offer-bid.component.scss']
})
export class OfferBidComponent implements OnInit {

  offerDetails: any;
  defaultImage = defaultNoImage;
  @Input('input') data: any;
  constructor(private fcmService: FcmService,
    private offerServie: OfferService,
) { }

  ngOnInit(): void {
     this.offerServie.getOfferDetail(this.data.entityId).subscribe((data: any)=>{
       this.offerDetails = data.payload;
     })
  }

  // goToOfferDetail(offerId){
  //    this.notificationService.onReadNotification(this.data);
  //    this.router.navigateByUrl(`/offer/${offerId}`);
  // }

}
