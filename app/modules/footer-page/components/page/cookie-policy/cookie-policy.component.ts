import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent implements OnInit {

  breadcrumb: any = [{
    name: 'Cookie policy',
    show: true,
    click: false,
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
