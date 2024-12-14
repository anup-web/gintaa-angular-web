import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryConstants } from '@gintaa/shared/constants/category.constant';
import { CategoryService } from '@gintaa/shared/services/category.service';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  private componentDestroyed$: Subject<void> = new Subject<void>();

  breadcrumb: any = [{
    name: 'Search',
    show: true,
    click: false,
  }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(
      takeUntil(this.componentDestroyed$)
      )
    .subscribe(
        (params: Params) => {
          const searchText: string = params.searchText || null;
          this.categoryService.setSearchText(searchText);
          this.categoryService.index = 1;
          // this.categoryService.searchResult.length = 0;
          this.categoryService.categoryDetails(searchText, null, this.categoryService.getCurrentIndex(), CategoryConstants.PAGE_SIZE);
          this.categoryService.clearParamList();
       }
    );

    this.categoryService.selectedCategoryLists$
       .pipe(
        tap((val) => console.log()),
         debounceTime(800),
         map
         (
           (queryParams: string) => {
             const queryParamArr: string[] = queryParams.split('~');
             const optionalQueryParam: string = this.categoryService.modifyQueryParams(queryParamArr[1]);
             const searchText: string = queryParamArr[0] !== 'null' ? queryParamArr[0] : null;
             this.categoryService.categoryDetails(searchText, optionalQueryParam,
             this.categoryService.getCurrentIndex(), 10);
           }
          ),
         takeUntil(this.componentDestroyed$)
       ).subscribe();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
    this.categoryService.clearSearchText.next('');
  }

}
