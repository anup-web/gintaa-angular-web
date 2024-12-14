import { Component, EventEmitter, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'app-my-deal-search',
  templateUrl: './my-deal-search.component.html',
  styleUrls: ['./my-deal-search.component.scss']
})
export class MyDealSearchComponent implements OnInit {
  @Output("updateFilter") updateFilter: EventEmitter<any> = new EventEmitter();
  @Output("updateFavourite") updateFavourite: EventEmitter<any> = new EventEmitter();
  @Input('searchForm') searchForm: any;
  @Input('search') search: any;
  @Input('onlyFavourite') onlyFavourite: boolean = false;
  @ViewChild('searchInputValue', { static: false }) public searchInputValue: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  get dealTypes() {
    return this.searchForm.get('dealTypes');
  };
  get publishedDate() {
    return this.searchForm.get('publishedDate');
  };

  onSelectDealType(e, i) {
    const dealType = this.dealTypes.value.map((val)=>false);
    dealType[i] = true;
    this.searchForm.get("dealTypes").setValue(dealType);
    this.updateFilter.emit();
  }

  onSelectPublisedDate(date){
    this.searchForm.get("publishedDate").setValue(date);
    this.updateFilter.emit();
  }

  setSearchText(event: any) {
   // this.myOfferFilterParams.searchText = event.target.value;
  }
  setOnlyFav(val){
    this.updateFavourite.emit(val);
  }

  
  clearFilter(clearField:string = ''){
    const dealType = [false, false, false, false, false, false, false, false, false, false];
    if(clearField === 'dealType'){
      this.searchForm.get("dealTypes").setValue(dealType);
      this.updateFilter.emit();
    } else if(clearField === 'publishedDate'){
      this.searchForm.get("publishedDate").setValue('');
      this.updateFilter.emit();
    } else {
      this.searchForm.get("dealTypes").setValue(dealType);
      this.searchForm.get("publishedDate").setValue('');
      this.updateFilter.emit();
    }
  }
}
