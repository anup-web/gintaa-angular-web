import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-make-exchange-animation',
  templateUrl: './make-exchange-animation.component.html',
  styleUrls: ['./make-exchange-animation.component.scss']
})
export class MakeExchangeAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
  }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'make-exchange-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/deal/make-exchange-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}