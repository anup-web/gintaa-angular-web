import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { defaultConfig } from '@gintaa/modules/home/configs/home.constant';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs-compat/Observable';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss'],  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCategoriesComponent implements OnInit {

  @Input() allPopularProductCategories: Observable<any[]>;
  defaultCategoryLength: number = defaultConfig.defaultCategoryCount;
  isShowPrev: boolean;
  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;
  constructor() { }

  ngOnInit() {
  }
  getPassedData(event) {

  }

}
