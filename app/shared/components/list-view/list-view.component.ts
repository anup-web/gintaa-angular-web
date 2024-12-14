import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '@gintaa/modules/profile/services/profile.service';
import { defaultListViewConfig } from '@gintaa/shared/configs/default.config';
import { Subscription } from 'rxjs';
import { ListViewConfig } from '../model/list-view';
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  @Output() backButtonClick = new EventEmitter<any>();
  @Output() breadcrumbButtonClick = new EventEmitter<any>();
  @Output() pageNumberChangeClick = new EventEmitter<any>();
  @Input() viewConfig: ListViewConfig;
  @Output() goToOfferPage=new EventEmitter<any>();
  subscription:Subscription;
  offerNoImage: string = 'assets/images/create-offer/uplaod-default-img.png';

  breadcrumb: any = [{
    name: 'User listing',
    show: true,
    click: false,
    link: '/',
  },
  {
    name: 'All',
    show: true,
    click: false,
  }];
  

  constructor(private profileService:ProfileService,) { }

  ngOnInit(): void {
    // const $this=this;
    this.viewConfig = {...defaultListViewConfig, ...this.viewConfig };
    // console.log("viewconfig",this.viewConfig);
    this.subscription=this.profileService.getOtherUserAllOffer().subscribe(list=>{
      let listAll=list.list;
      this.viewConfig={...listAll};
      // console.log("viewconfig",this.viewConfig);
    });
  }

  back(){
    this.backButtonClick.emit('');
  }

  clickBreadcrumb(){
    this.breadcrumbButtonClick.emit('');
  }

  getOfferImage(img:any){
    if(Array.isArray(img) && img[0] && img[0].hasOwnProperty('url') ){
      return img[0]['url'];
    }
    return this.offerNoImage;
  }
  errorImageHandler(event){
    event.target.src = this.offerNoImage;
  }

  pageChange(event){
    this.viewConfig.paginationConfig.currentPage = event;
    this.pageNumberChangeClick.emit(event);
    }

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

  navigateTo(data:any){
    // console.log("in navigateTo");
    this.goToOfferPage.emit(data.offerId);
  }
  }
