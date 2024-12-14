import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-help-and-guide',
  templateUrl: './help-and-guide.component.html',
  styleUrls: ['./help-and-guide.component.scss']
})
export class HelpAndGuideComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
  }

}
