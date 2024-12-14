import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-insurance-check',
  templateUrl: './insurance-check.component.html',
  styleUrls: ['./insurance-check.component.scss']
})
export class InsuranceCheckComponent implements OnInit {

  public canvasId: string;

  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'insurance-banner-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/banner/insurance-banner.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}

