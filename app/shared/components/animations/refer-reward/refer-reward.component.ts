import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-refer-reward',
  templateUrl: './refer-reward.component.html',
  styleUrls: ['./refer-reward.component.scss']
})
export class ReferRewardComponent implements OnInit {

  public canvasId: string;

  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'referral-reward-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/banner/referral-reward.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}
