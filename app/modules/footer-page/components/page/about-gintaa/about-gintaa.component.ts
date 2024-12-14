import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-about-gintaa',
  templateUrl: './about-gintaa.component.html',
  styleUrls: ['./about-gintaa.component.scss']
})
export class AboutGintaaComponent implements OnInit {


  breadcrumb: any = [{
    name: 'About gintaa',
    show: true,
    click: false,
  }];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
  }

}
