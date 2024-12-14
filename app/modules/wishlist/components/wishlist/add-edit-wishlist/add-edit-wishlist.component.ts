import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SearchSuggestion } from '@gintaa/core/models/Search';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, of, Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Vertical } from '@gintaa/core/models/Category';
import { SearchService } from '@gintaa/core/services/search.service';
import { CreateOfferService } from '@gintaa/modules/create-offer/services/create-offer.service';
import { Router } from '@angular/router';
import { CategoryService } from '@gintaa/shared/services/category.service';
import { map, startWith } from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-edit-wishlist',
  templateUrl: './add-edit-wishlist.component.html',
  styleUrls: ['./add-edit-wishlist.component.scss']
})
export class AddEditWishlistComponent implements OnInit {
  
  public searchKeyword: string  = '';
  public selectedTags: string[] = [];
  

  @Output() newOfferItem = new EventEmitter<string[]>();



  private componentDestroyed$: Subject<void> = new Subject<void>();
  // searchPlaceholder: string = Constants.SEARCH_PLACEHOLDER;
  filteredOptions$: Observable<SearchSuggestion[]>;
  isSearchDisabled = true;  
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;
  allCategories$: Observable<Vertical[]>;
  selectedCategory: string = null;
  isCategorySelected: boolean = false;

  constructor(
    private searchService: SearchService,
    private createOfferService: CreateOfferService,
    private router: Router,
    private categoryService: CategoryService
    ) { }

  ngOnInit() {
  }



  getPassedData(event) {

  }

  selectedCustomTags(selectedTags: string[] = []) {
    // console.log('selectedTags:', selectedTags);
    // this.createItemOfferForm.get("customTags").setValue(selectedTags);
    // this.createItemOfferForm.get("customTags").updateValueAndValidity();
    this.selectedTags = selectedTags;
  }

  addWishlist() {
    
    let currentTimeStamp = new Date().getTime();
    // console.log('currentTimeStamp:', currentTimeStamp);

    let offerItem: any = {
      "wishlistId": currentTimeStamp,
      "seOId": "test-watch-offer-oid-"+currentTimeStamp,
      "name": this.searchKeyword,
      "selectedTags": this.selectedTags,
      "offers": []
    }
    this.newOfferItem.emit(offerItem);

    this.searchKeyword = '';
  }

  getsSelectedCustomTag(selectedTags: any) {
    // console.log('============ selectedTags ============', selectedTags);
    this.selectedTags = selectedTags;
  }

  changeSearchKeyword(searchText) {
    // console.log('searchText:', searchText)
    this.searchKeyword = searchText;
  }

}
