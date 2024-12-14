import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-finish-a-deal-animation',
  templateUrl: './finish-a-deal-animation.component.html',
  styleUrls: ['./finish-a-deal-animation.component.scss']
})
export class FinishADealAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
  }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'finish-a-deal-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/deal/finish-a-deal-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}