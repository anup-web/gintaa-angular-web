import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-data-protection-policy',
  templateUrl: './personal-data-protection-policy.component.html',
  styleUrls: ['./personal-data-protection-policy.component.scss']
})
export class PersonalDataProtectionPolicyComponent implements OnInit {

  breadcrumb: any = [{
    name: 'Personal data protection policy',
    show: true,
    click: false,
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
