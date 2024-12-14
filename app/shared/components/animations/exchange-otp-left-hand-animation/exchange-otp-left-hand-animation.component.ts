import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-exchange-otp-left-hand-animation',
  templateUrl: './exchange-otp-left-hand-animation.component.html',
  styleUrls: ['./exchange-otp-left-hand-animation.component.scss']
})
export class ExchangeOtpLeftHandAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
  }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'exchange-otp-left-hand-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/deal/exchange-otp-left-hand-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 50);
    
  }

}