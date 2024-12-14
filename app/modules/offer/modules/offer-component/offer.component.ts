import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


const items = [
  {
    imgUrl:'assets/pro/21.jpg',
    address: 'Bidhanagar',
    itemName: 'Captain Coons Watches',
    category: ['Mobile', 'Laptop']
  },
  {
    imgUrl:'assets/pro/22.jpg',
    address: 'Bidhanagar',
    itemName: 'Coach Tabby 26 for sale',
    category: ['Mobile', 'Laptop']
  },
  {
    imgUrl:'assets/pro/23.jpg',
    address: 'Bidhanagar',
    itemName: 'Gopro hero 7 (with receipt)',
    category: ['Mobile', 'Laptop']
  },
  {
    imgUrl:'assets/pro/24.jpg',
    address: 'Bidhanagar',
    itemName: 'iPad Pro 2017 Model',
    category: ['Mobile', 'Laptop']
  },
  {
    imgUrl:'assets/pro/25.jpg',
    address: 'Bidhanagar',
    itemName: 'Dell Computer Monitor',
    category: ['Mobile', 'Laptop']
  },
  {
    imgUrl:'assets/pro/26.jpg',
    address: 'Bidhanagar',
    itemName: 'Coach Tabby 26 for sale',
    category: ['Mobile', 'Laptop']
  },
  {
    imgUrl:'assets/pro/27.jpg',
    address: 'Bidhanagar',
    itemName: 'Gopro hero 7 (with receipt)',
    category: ['Mobile', 'Laptop']
  },
  {
    imgUrl:'assets/pro/28.jpg',
    address: 'Bidhanagar',
    itemName: 'Gopro hero 7 (with receipt)',
    category: ['Mobile', 'Laptop']
  }
];
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponent implements OnInit {

  currentSectionConfig: any;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ left:0, top: 0});
    }
    this.currentSectionConfig = {
      title: 'Recomanded Offers',
      iconUrlConfig: {
        url: 'assets/images/recom-offer-icon.png',
        height: 35,
        width: 25,
        class: 'recom-image'
      },
      items: items,
      isActionButton: true,
      actionButton: {
        label: 'back',
      },
      isBreadCrumb: true,
      breadCrumbText: 'Recomanded Offers',
    }
  }

  getChildMessage($event){
    //console.log($event);
    this.router.navigate(['/'])
  }

}
