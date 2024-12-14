import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-empty-wishlist-animation',
  templateUrl: './empty-wishlist-animation.component.html',
  styleUrls: ['./empty-wishlist-animation.component.scss']
})
export class EmptyWishlistAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
   }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'empty-wishlist-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/wishlist/empty-wishlist-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}