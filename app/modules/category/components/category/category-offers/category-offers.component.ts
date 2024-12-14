import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '@gintaa/shared/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-offers',
  templateUrl: './category-offers.component.html',
  styleUrls: ['./category-offers.component.scss']
})
export class CategoryOffersComponent implements OnInit, OnDestroy {

  constructor(public categoryService: CategoryService) { }

  showFavIcon: boolean = false;
  searchResults: any[] = [];
  categorySubscriber: Subscription;

  ngOnInit(): void {
    this.categorySubscriber = this.categoryService.categoryDetails$.subscribe(res => {
      if(res) {
        this.searchResults = res.searchResult;
      }
    })
  }

  onScrollDown() {
    // console.log('On Scrolll');
    this.categoryService.addIndex();
  }

  ngOnDestroy() {
    try {
      this.categorySubscriber.unsubscribe();
    } catch (error) {}
  }

}
