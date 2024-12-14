import { Component, OnInit } from '@angular/core';

declare var rive: any;

@Component({
  selector: 'app-empty-favourite-animation',
  templateUrl: './empty-favourite-animation.component.html',
  styleUrls: ['./empty-favourite-animation.component.scss']
})
export class EmptyFavouriteAnimationComponent implements OnInit {

  public canvasId: string;

  constructor() { }

  ngOnInit(): void {
    const currentTime = new Date().getTime();
    // console.log('currentTime:', currentTime);
    // const randNumber  = Math.floor((Math.random() * 100) + 1);
    const cId = 'empty-favourite-' + currentTime;
    this.canvasId = cId;

    setTimeout(()=>{
      rive.Rive.new({
        src: 'assets/animation/favourites/empty-favourite.riv',
        canvas: document.getElementById(cId),
        autoplay: true,
      });
    }, 100);
    
  }

}

