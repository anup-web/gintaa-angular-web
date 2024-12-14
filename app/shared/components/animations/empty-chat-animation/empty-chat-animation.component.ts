import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-empty-chat-animation',
  templateUrl: './empty-chat-animation.component.html',
  styleUrls: ['./empty-chat-animation.component.scss']
})
export class EmptyChatAnimationComponent implements OnInit {

  public canvasId: string;
  constructor() {

  }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'empty-chat-animation-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(() => {
      rive.Rive.new({
        src: 'assets/animation/chat/empty-chat-animation.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);

  }

}