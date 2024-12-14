import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-privacy-policy',
  templateUrl: './business-privacy-policy.component.html',
  styleUrls: ['./business-privacy-policy.component.scss']
})
export class BusinessPrivacyPolicyComponent implements OnInit {

  breadcrumb: any = [{
    name: 'Business privacy policy',
    show: true,
    click: false,
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
