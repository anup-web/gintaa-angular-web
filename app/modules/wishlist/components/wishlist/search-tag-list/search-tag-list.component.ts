import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '@gintaa/modules/wishlist/services/wishlist.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-tag-list',
  templateUrl: './search-tag-list.component.html',
  styleUrls: ['./search-tag-list.component.scss']
})
export class SearchTagListComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;

  @Input('search_key') searchKeyword: string;
  @Output() selectedCustomTag = new EventEmitter<string[]>();
  
  // allCategories$: Observable<any>;
  suggestCategories: any[] = [];
  selectedCategories: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private wishListService: WishlistService,    
    // private store: Store<gintaaApp.AppState>,
    ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    
  }

  ngOnChanges(changes: any) {
    this.getTagsBySearchKeyWord(changes.searchKeyword.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
  }

  getTagsBySearchKeyWord(keyword: string) {
    // console.log('keyword:', keyword);
    let suggestedCat$: Observable<any>;
    suggestedCat$ = this.wishListService.findAllCategoriesBySearchKeyWord(keyword);
    // const cat: any = this.wishListService.findAllCategoriesBySearchKeyWord(keyword);

    suggestedCat$.subscribe((result) => {
      // console.log('allCategories result:', result);
      this.suggestCategories = result;

      this.sortListArray();

    });

    // console.log('allCategories', this.allCategories$);
  }


  getPassedData(event) {

  }

  selectTag(tagItem: any) {
    // console.log('selectTag: ', this.selectedCategories);
    // console.log('selectTag: ', tagItem);


    // this.selectedCustomTag.emit(tagItem);
    // this.customTags = [];
  }

  removeSelectedCategories(item: any, index: number): void {
    // console.log('item:', item, index);
    this.selectedCategories.push(item);
    this.suggestCategories.splice(index, 1);
    this.sortListArray();
    // console.log('SelectedCategories: ', this.selectedCategories);
    this.emitSelectedTags();
  }

  changeSelected($event: any, item: any) {

  }

  remove(category: any, i: number) {
    // console.log('remove category:', category);
    this.selectedCategories.splice(i, 1);
    this.suggestCategories.push(category);
    this.sortListArray();
    
    // console.log('SelectedCategories: ', this.selectedCategories);
    this.emitSelectedTags();
  }

  sortListArray() {
    this.suggestCategories.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
    // this.selectedCategories.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
  }

  emitSelectedTags() {
    // console.log('----------');
    this.selectedCustomTag.emit(this.selectedCategories);
  }

}
