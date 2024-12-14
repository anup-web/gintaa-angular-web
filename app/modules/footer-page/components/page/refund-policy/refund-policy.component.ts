import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refund-policy',
  templateUrl: './refund-policy.component.html',
  styleUrls: ['./refund-policy.component.scss']
})
export class RefundPolicyComponent implements OnInit {

  breadcrumb: any = [{
    name: 'Refund policy',
    show: true,
    click: false,
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
