import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-refer-reward-add',
  templateUrl: './refer-reward-add.component.html',
  styleUrls: ['./refer-reward-add.component.scss']
})
export class ReferRewardAddComponent implements OnInit {

  public canvasId: string;

  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'referral-reward-add-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/banner/referral-reward-add.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}
