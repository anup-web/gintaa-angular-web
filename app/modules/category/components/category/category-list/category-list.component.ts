import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CategoryConstants } from '@gintaa/shared/constants/category.constant';
import { CategoryService } from '@gintaa/shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  isBrowser: boolean;
  selectedCategory: string = '';
  priceRange: any = {
    minPrice: 0,
    maxPrice: 0,
    minValue: 0,
    maxValue: 0
  };
  options: Options = {
    floor: 0,
    ceil: 0,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> " + value;
        case LabelType.High:
          return "<b>Max price:</b> " + value;
        default:
          return value.toString();
      }
    }
  };
  constructor(
    public categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.categoryService.categoryDetails$.subscribe(res => {
      if(res) {
        const appliedFilters = res.appliedFilters;
        let key = [];
        if(appliedFilters) {
          key = Object.keys(appliedFilters);          
        }
        if(key.includes('Price')) {
          let value = appliedFilters['Price'];
          this.priceRange.minValue = value.split("::")[0];
          this.priceRange.maxValue = value.split("::")[1];
        } else {
          this.priceRange.minValue = res.minPrice;
          this.priceRange.maxValue = res.maxPrice;
        }        
        this.options.floor = res.minPrice;
        this.options.ceil = res.maxPrice;
      }
    })
   }

  toggleItem(primaryFacet: string, secondaryFacet: any, event: MatCheckboxChange) {
    const categoryVal: string = `${primaryFacet}_${secondaryFacet.key}`;
    if (event.checked) {
      this.categoryService.addQueryParamList(categoryVal);
    } else {
      this.categoryService.removeFromQueryParamList(categoryVal);
    }
    this.categoryService.sendSelectedCategory();
  }

  exists(primaryFacet: string, secondaryFacet: any) {
    const item: string = `${primaryFacet}_${secondaryFacet.key}`;
    return this.categoryService.paramList.indexOf(item) > -1;
  }

  checkFacet(primaryFacetKey: string) {
    return primaryFacetKey!== 'Size' && primaryFacetKey!== 'Quantity';
  }

  selectedCategories(catId: string): boolean {
    if(this.categoryService.leafNodeCategoryId) {
      return this.categoryService.leafNodeCategoryId.indexOf(catId) > -1;
    }
    return false;
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    const rangeValue: string = this.getChangeContextString(changeContext);
    this.categoryService.removeOldPriceFromQueryParam();
    this.categoryService.addQueryParamList(rangeValue);
    this.categoryService.sendSelectedCategory();
  }

  getChangeContextString(changeContext: ChangeContext): string {
    this.categoryService.setFloorPrice(changeContext.value);
    this.categoryService.setCeilPrice(changeContext.highValue);
    return `Price_${changeContext.value}::${changeContext.highValue}`;
  }

  itemSelectionLeafNode(node: any): void {
    // console.log('node details leaf node::', node);
    const categoryId: string = node.target.value;
    // this.selectedCategory = categoryId;
    this.categoryService.setCategoryId(categoryId);
    this.categoryService.sendSelectedCategory();
  }

  resetAllFilter() {
    this.categoryService.index = 1;
    this.categoryService.setFloorPrice(null);
    this.categoryService.setCeilPrice(null);
    this.categoryService.setCategoryId(null);
    this.categoryService.categoryDetails(this.categoryService.getSearchText(), null, this.categoryService.getCurrentIndex(), CategoryConstants.PAGE_SIZE);
    this.categoryService.clearParamList();
    this.categoryService.setInitialPrice(this.categoryService.floorPrice, this.categoryService.ceilPrice);  
  }

}
