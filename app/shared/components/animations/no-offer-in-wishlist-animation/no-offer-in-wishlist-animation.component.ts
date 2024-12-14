import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-no-offer-in-wishlist-animation',
  templateUrl: './no-offer-in-wishlist-animation.component.html',
  styleUrls: ['./no-offer-in-wishlist-animation.component.scss']
})
export class NoOfferInWishlistAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
   }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'no-offer-in-wishlist-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      // console.log('timeout:', cId);
      rive.Rive.new({
        src: 'assets/animation/wishlist/no-offer-in-wishlist-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}