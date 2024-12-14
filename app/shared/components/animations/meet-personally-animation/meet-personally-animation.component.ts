import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-meet-personally-animation',
  templateUrl: './meet-personally-animation.component.html',
  styleUrls: ['./meet-personally-animation.component.scss']
})
export class MeetPersonallyAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {
    
  }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'meet-personally-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/deal/meet-personally-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 1000);
    
  }

}