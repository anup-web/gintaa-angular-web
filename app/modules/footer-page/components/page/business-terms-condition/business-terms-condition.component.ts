import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-terms-condition',
  templateUrl: './business-terms-condition.component.html',
  styleUrls: ['./business-terms-condition.component.scss']
})
export class BusinessTermsConditionComponent implements OnInit {

  breadcrumb: any = [{
    name: 'Business terms and condition',
    show: true,
    click: false,
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
