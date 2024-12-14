import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.scss']
})
export class LoadingAnimationComponent implements OnInit {

  public canvasId: string;

  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'loader-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(() => {
      rive.Rive.new({
        src: 'assets/animation/loader/loader.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);

  }

}
