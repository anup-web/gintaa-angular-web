import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-empty-cart-animation',
  templateUrl: './empty-cart-animation.component.html',
  styleUrls: ['./empty-cart-animation.component.scss']
})
export class EmptyCartAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
   }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'empty-cart-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/deal/empty-cart-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}