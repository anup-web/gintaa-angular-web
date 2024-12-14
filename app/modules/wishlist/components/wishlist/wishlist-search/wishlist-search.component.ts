import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEBOUNCE_TIME } from '@gintaa/config/constant.config';
import { SearchSuggestion } from '@gintaa/core/models/Search';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { SearchService } from '@gintaa/core/services/search.service';
import { CreateOfferService } from '@gintaa/modules/create-offer/services/create-offer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Category, Vertical } from '@gintaa/core/models/Category';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CategoryService } from '@gintaa/shared/services/category.service';

@Component({
  selector: 'app-wishlist-search',
  templateUrl: './wishlist-search.component.html',
  styleUrls: ['./wishlist-search.component.scss']
})
export class WishlistSearchComponent implements OnInit {

  @Input('search_key') searchKey: string;
  @Output() searchKeyword = new EventEmitter<string>();

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

  ngOnInit(): void {
    this.loadAllVerticals()
  }

  ngOnChanges(changes: any) {
    let searchKey = changes.searchKey.currentValue
    // console.log('---aaaaaaaa', searchKey);

    this.searchInput.nativeElement.value = searchKey;
    
    
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.searchInput.nativeElement, 'focus')
    .pipe(
      map(event => event.target.value),
      switchMap(value => this.loadSuggestions(value)),      
      first()
    ).subscribe(res => {
      this.filteredOptions$ = of(res)
    })

    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
    .pipe(
      map(event => event.target.value),
      debounceTime(DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap((search: string) => this.loadSuggestions(search)),
      takeUntil(this.componentDestroyed$)
    ).subscribe(res => {
      this.filteredOptions$ = of(res)
    })
  }

  loadAllVerticals() {
    this.allCategories$ = this.searchService.getAllVerticals();
  }

  search() {
    const searchVal: string = this.searchInput.nativeElement.value;
    this.emitSearchText(searchVal);
    if(searchVal && searchVal.length >=3) {
      this.navigateToCategoryPage();
    }
  }

  selectCategory(category: Vertical) {
    this.selectedCategory = category.name;
    this.isCategorySelected = true;
  }

  openCloseDialog() {
    
  }

  loadSuggestions(search: string): Observable<SearchSuggestion[]> {
    // console.log('loadSuggestion', search)
    this.isSearchDisabled = true;
    if(search.length >=3) {
      this.isSearchDisabled = false;
      return this.searchService.getSuggestion(search)
        .pipe(
          // map(res => res['payload'] ?  this.convertToObj(res['payload']) : null)
          map(res => res.payload ?  res.payload : null)
        );
    } else if(!search) {
      return this.searchService.getSearchHistory()
        .pipe(
          map(res => res.payload ?  this.uniqueResult(res.payload) : null),
        );
    } 
    return of([]);    
  }

  uniqueResult(res): SearchSuggestion[] {
    const unique: SearchSuggestion[] = [... new Map(res.map(item => [item.searchText.toLowerCase(), item])).values()];  // (arr.map(item => [item.id, item])).values()
    return unique;
  }

  addClass() {
    //if(this.authService.isAuthenticated()) {
      //element.classList.add('search-input-focus');
    //}  
    this.searchInput.nativeElement.classList.add('search-input-focus') 
  }

  removeClass() {
    //element.classList.remove('search-input-focus');
    this.searchInput.nativeElement.classList.remove('search-input-focus') 
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    // console.log('Event:::', event.option.value);
    const searchVal: string = event.option.value.title || event.option.value.searchText;
    // console.log('Event searchVal:::', searchVal);
    this.searchInput.nativeElement.value = searchVal;
    // this.searchForm.get('searchBox').setValue(searchVal);
    // this.searchForm.get('searchBox').updateValueAndValidity();
    const categoryId: string = event.option.value.categoryId;
    this.categoryService.setCategoryId(categoryId);
    // this.router.navigate(['/category'], { queryParams: { searchText: searchVal }});
    this.emitSearchText(searchVal);
   }

  suggestionSelected(suggestion: any) {
    // this.addressInput.addressLine = prediction.description;
    // this.placeService.getPlaceDetails(prediction.place_id)
    // .subscribe(
    //   (placeDetails: google.maps.places.PlaceResult) => {
    //     this.extractPlaceDetails(placeDetails);
    //   }
    // );
  }

  navigateToCategoryPage() {
    const searchTextVal = this.searchInput.nativeElement.value;
    // this.categoryService.setCategoryId(null);
    // if(this.searchForm.get('searchBox').value === this.categoryService.getSearchText()) {
    //   console.log('Match');
    // }
    this.emitSearchText(searchTextVal);

    // searchTextVal ? 
    //   this.router.navigate(['/category'], { 
    //     queryParams: { 
    //       searchText: searchTextVal 
    //     }
    //   })
    // : this.router.navigate(['/category']);

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  emitSearchText(value: string) {
    this.searchKeyword.emit(value);
  }

}
