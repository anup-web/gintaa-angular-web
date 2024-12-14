import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-exchange-otp-right-hand-animation',
  templateUrl: './exchange-otp-right-hand-animation.component.html',
  styleUrls: ['./exchange-otp-right-hand-animation.component.scss']
})
export class ExchangeOtpRightHandAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
  }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'exchange-otp-right-hand-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/deal/exchange-otp-right-hand-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 50);
    
  }

}