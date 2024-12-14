import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListViewConfig } from '@gintaa/shared/components/model/list-view';
import { ProfileService } from '@gintaa/modules/profile/services/profile.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-user-all-offer',
  templateUrl: './user-all-offer.component.html',
  styleUrls: ['./user-all-offer.component.scss']
})
export class UserAllOfferComponent implements OnInit { 
  
  currentPage: number = 1;
  itemsPerpage: number = 4;
  totalItems: number = 36;
  paginationId: string = 'id';
  userId: string;
  breadcrumb: any = [
    {
      name: "User Offer listings",
      link: "",
    },
  ];
  currentSectionConfig: ListViewConfig = {
    title: 'User listings',
    iconUrlConfig: {
      url: 'assets/images/recom-offer-icon.png',
      height: 35,
      width: 25,
      class: 'recom-image'
    },
    items: [],
    isActionButton: true,
    actionButton: {
      label: 'back',
    },
    isBreadCrumbRequired: true,
    breadCrumbText: 'User listings',
    isPaginationRequired: false,
    paginationConfig: {
      itemsPerPage: this.itemsPerpage, 
      currentPage: this.currentPage, 
      id: this.paginationId ,
      totalItems: this.totalItems
    }
  };

  userAllListings: any[] = [];
  businessId: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }

    this.breadcrumb[0] = {
      name: this.currentSectionConfig.title,
      link: "",
    };
    //this.route.paramMap.subscribe(params => {
      this.userId = this.route.snapshot.paramMap.get("userId");

      this.route.queryParams
        .subscribe(params => {
          this.businessId = params.businessId;
          console.log('businessId:', this.businessId);
        }
      );

      this.profileService.getUserOffer(this.userId, this.businessId).subscribe(
      res => {
        this.userAllListings = res;
        this.currentSectionConfig.items.push(...this.userAllListings);
      });      
    // });    
  }

  getBackButtonMsg($event){
    this.location.back()
   // this.router.navigate([`profile/${this.userId}/view`]);
  }

  backToHome(data: any) {
    // this.router.navigate(["/home"], {
    //   fragment: this.type
    // });
  
  }

  getBreadcrumbMsg($event){
    this.router.navigate(['/'])
  }

  getNextPageDataMsg(pageNumber: number){
    this.currentPage = pageNumber;
    this.currentSectionConfig.paginationConfig.currentPage = this.currentPage;
  }

  onScrollDown() {
  }

}
