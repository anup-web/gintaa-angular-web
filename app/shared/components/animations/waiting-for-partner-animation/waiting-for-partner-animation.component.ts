import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-waiting-for-partner-animation',
  templateUrl: './waiting-for-partner-animation.component.html',
  styleUrls: ['./waiting-for-partner-animation.component.scss']
})
export class WaitingForPartnerAnimationComponent implements OnInit {


  public canvasId: string;
  constructor() {
    
  }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'waiting-for-partner-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/deal/waiting-for-partner-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}