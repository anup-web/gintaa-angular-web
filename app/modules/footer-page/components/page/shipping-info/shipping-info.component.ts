import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss']
})
export class ShippingInfoComponent implements OnInit {

  breadcrumb =  [{
    name: 'Shipping',
    show: true,
    click: false,
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
