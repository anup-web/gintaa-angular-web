import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-listing-policy',
  templateUrl: './listing-policy.component.html',
  styleUrls: ['./listing-policy.component.scss']
})
export class ListingPolicyComponent implements OnInit {

  breadcrumb: any = [{
    name: 'Listing policy',
    show: true,
    click: false,
  }];
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
  }

}
