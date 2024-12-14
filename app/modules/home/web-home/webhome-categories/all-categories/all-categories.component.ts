import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { defaultConfig } from '@gintaa/modules/home/configs/home.constant';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs-compat/Observable';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCategoriesComponent implements OnInit {

  @Input() allPopularCategories: Observable<any[]>;
  title = 'angularowlslider';
  defaultCategoryLength: number = defaultConfig.defaultCategoryCount;
  isShowPrev: boolean;
  customOptions: OwlOptions = defaultOwlOptions;
  constructor() { }

  ngOnInit() {}

  getPassedData(event) { }

}
