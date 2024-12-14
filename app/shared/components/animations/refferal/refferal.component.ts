import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-refferal',
  templateUrl: './refferal.component.html',
  styleUrls: ['./refferal.component.scss']
})
export class RefferalComponent implements OnInit {

  public canvasId: string;

  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'refferal-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/banner/refferal.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}

