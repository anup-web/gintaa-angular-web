import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UploadResponse } from '@gintaa/shared/models';
import Drift from 'drift-zoom';

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-media-swiper',
  templateUrl: './media-swiper.component.html',
  styleUrls: ['./media-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediaSwiperComponent implements OnInit, AfterViewInit {

  thumbsSwiper: any;
  swiperNavigation: boolean;
  _medias:UploadResponse[];
  isQuantitynull :boolean = false;

  @Input()
  set medias(medias:UploadResponse[]){
    // console.log('mediass:::', medias);
    this._medias=medias;
  }
  @Input() quantity: number;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.swiperNavigation = this._medias.length >= 2;
   // console.log("quantity",this.quantity);
  }

  checkQuantity(){
    if(this.quantity === 0){
      this.isQuantitynull = true;
      return true;
    }else{
      this.isQuantitynull = false;
      return false;
    }
  }

  ngAfterViewInit(): void {
   setTimeout(() => {
    this.triggerDriftZoom();
   }, 900);
  }

  triggerDriftZoom() {
    const demoTrigger = this.el.nativeElement.querySelectorAll('.demo-trigger');
    const paneContainer = document.querySelector('.detail');
    if(demoTrigger && demoTrigger.length){
      demoTrigger.forEach(img => {
        new Drift(img, {
          paneContainer: paneContainer,
          inlinePane: false
        });
      });
    }
  }

  mediaId(index: number, item: UploadResponse){
    return item.id; 
 }

}
