import { Component, OnInit } from '@angular/core';

declare var rive: any;
@Component({
  selector: 'app-business-banner',
  templateUrl: './business-banner.component.html',
  styleUrls: ['./business-banner.component.scss']
})
export class BusinessBannerComponent implements OnInit {

  public canvasId: string;
  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'business-' + currentTime;
    this.canvasId = cId;

    setTimeout(() => {
      rive.Rive.new({
        src: 'assets/animation/banner/business.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);

  }

}
