import { Component,  OnInit } from '@angular/core';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-services-categories',
  templateUrl: './services-categories.component.html',
  styleUrls: ['./services-categories.component.scss']  
})
export class ServicesCategoriesComponent implements OnInit {
  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;

  constructor() { }

  ngOnInit() {
  }
  getPassedData(event) {

  }

}
