import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@gintaa/core/services';
import { StorageService } from '@gintaa/core/services/storage.service';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
import { chatOngoingDealCommunication } from '@gintaa/shared/models';

@Component({
  selector: 'app-chat-deal-item-showcase',
  templateUrl: './chat-deal-item-showcase.component.html',
  styleUrls: ['./chat-deal-item-showcase.component.scss']
})
export class ChatDealItemShowcaseComponent implements OnInit {

  @Input('dealDetails') deal: chatOngoingDealCommunication;
  dealDetails: {
    sendingOffers: any[],
    sendingAmount: number,
    receivingOffers: any[],
    receivingAmount: number
    dealStatus: string
  } = {
    sendingOffers: [],
    sendingAmount: 0,
    receivingOffers: [],
    receivingAmount: 0,
    dealStatus: ''
  };
  loggedInBusinessId: string;
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    let loggedInBusinessDetails: any = this.storageService.getSelectedBusiness();
    this.loggedInBusinessId = loggedInBusinessDetails?.businessId;
    if(this.deal?.requestedOffers){
      if(this.checkIsItLoggedInUser(this.deal.receiver.identityId) || this.checkIsItLoggedInUser(this.deal.receiver.id)){
        this.dealDetails.sendingOffers = this.deal.requestedOffers || [];
        this.dealDetails.receivingOffers = this.deal.offeredOffers || [];
        this.dealDetails.sendingAmount = this.deal.offeredAmount || 0;
        this.dealDetails.receivingAmount = this.deal.requestedAmount || 0;
        this.dealDetails.dealStatus = 'Incoming';
      } else if(this.checkIsItLoggedInUser(this.deal.sender.identityId) || this.checkIsItLoggedInUser(this.deal.sender.id)){
        this.dealDetails.sendingOffers = this.deal.offeredOffers || [];
        this.dealDetails.receivingOffers = this.deal.requestedOffers || [];
        this.dealDetails.sendingAmount = this.deal.requestedAmount || 0;
        this.dealDetails.receivingAmount = this.deal.offeredAmount || 0;
        this.dealDetails.dealStatus = 'Outgoiong';
      }
      // console.log(this.dealDetails);
    }
  }

  showDealOfferImage(images){
    return images && images.length>0
              ? images[0].url
              : defaultNoImage
  }

  checkIsItLoggedInUser(userId, shouldFindInArray: boolean = false){
    if(shouldFindInArray){
      return userId.indexOf(this.authService.currentUserId) || userId.indexOf(this.loggedInBusinessId);
    } else {
      return this.authService.currentUserId === userId || this.loggedInBusinessId === userId;
    }
   
  }

}
