import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-push-on-button-animation',
  templateUrl: './push-on-button-animation.component.html',
  styleUrls: ['./push-on-button-animation.component.scss']
})
export class PushOnButtonAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
  }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'push-on-button-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/deal/push-on-button-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}