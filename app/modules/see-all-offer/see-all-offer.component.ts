import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ListViewConfig } from '@gintaa/shared/components/model/list-view';

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
  },
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
  }
];
@Component({
  selector: 'app-see-all-offer',
  templateUrl: './see-all-offer.component.html',
  styleUrls: ['./see-all-offer.component.scss']
})
export class SeeAllOfferComponent implements OnInit {

  currentSectionConfig: ListViewConfig;
  pageStartIndex: number = 0;
  currentPage: number = 1;
  itemsPerpage: number = 3;
  totalItems: number = 36;
  paginationId: string = 'id';

  constructor(  
      private router: Router,
      @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
    //const currentPageItems = items.splice(this.pageStartIndex, this.currentPage * this.itemsPerpage);
    const currentPageItems = items;
    this.currentSectionConfig = {
      title: 'Recommended offers',
      iconUrlConfig: {
        url: 'assets/images/recom-offer-icon.png',
        height: 35,
        width: 25,
        class: 'recom-image'
      },
      items: currentPageItems,
      isActionButton: true,
      actionButton: {
        label: 'back',
      },
      isBreadCrumbRequired: true,
      breadCrumbText: 'Recommended offers',
      isPaginationRequired: true,
      paginationConfig: {
        itemsPerPage: this.itemsPerpage, 
        currentPage: this.currentPage, 
        id: this.paginationId ,
        totalItems: this.totalItems
      }
    }
  }

  getBackButtonMsg($event){
    this.router.navigate(['/'])
  }

  getBreadcrumbMsg($event){
    this.router.navigate(['/'])
  }

  getNextPageDataMsg(pageNumber: number){
    this.currentPage = pageNumber;
    this.currentSectionConfig.paginationConfig.currentPage = this.currentPage;
    //this.currentSectionConfig.items = items.splice(this.pageStartIndex, this.currentPage * this.itemsPerpage);
  }

}
