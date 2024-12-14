import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-empty-offer-cart-animation',
  templateUrl: './empty-offer-cart-animation.component.html',
  styleUrls: ['./empty-offer-cart-animation.component.scss']
})
export class EmptyOfferCartAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
   }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'empty-offer-cart-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/offer/empty-offer-cart-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}