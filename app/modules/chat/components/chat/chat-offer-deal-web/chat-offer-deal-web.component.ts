import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-offer-deal-web',
  templateUrl: './chat-offer-deal-web.component.html',
  styleUrls: ['./chat-offer-deal-web.component.scss']
})
export class ChatOfferDealWebComponent implements OnInit {

  breadcrumb: any = [{
    name: 'Trading Chat',
    show: true,
    click: false,
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
