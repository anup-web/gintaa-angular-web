import { Component, OnInit } from '@angular/core';
declare var rive: any;
@Component({
  selector: 'app-gintaa-junction-list',
  templateUrl: './gintaa-junction.component.html',
  styleUrls: ['./gintaa-junction.component.scss']
})
export class GintaaJunctionComponent implements OnInit {

  public canvasId: string;
  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'gintaa_junction-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/banner/gintaa_junction.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}
