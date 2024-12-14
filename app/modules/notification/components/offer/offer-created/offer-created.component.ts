import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offer-created',
  templateUrl: './offer-created.component.html',
  styleUrls: ['./offer-created.component.scss']
})
export class OfferCreatedComponent implements OnInit {

  @Input('input') data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
