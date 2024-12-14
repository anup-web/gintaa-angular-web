import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-offer-posting-animation',
  templateUrl: './offer-posting-animation.component.html',
  styleUrls: ['./offer-posting-animation.component.scss']
})
export class OfferPostingAnimationComponent implements OnInit {

  public canvasId: string;

  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'new-offer-posting-canvas-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/offer/new-offer-posting.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}
