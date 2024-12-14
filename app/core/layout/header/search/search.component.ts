import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { DEBOUNCE_TIME } from '@gintaa/config/constant.config';
import { Vertical } from '@gintaa/core/models/Category';
import { SearchSuggestion } from '@gintaa/core/models/Search';
import { SearchService } from '@gintaa/core/services/search.service';
import { CategoryService } from '@gintaa/shared/services/category.service';
import { fromEvent, noop, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private componentDestroyed$: Subject<void> = new Subject<void>();
  filteredOptions$: Observable<SearchSuggestion[]>;
  isSearchDisabled = true;  
  queryField: FormControl = new FormControl();
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;
  allCategories$: Observable<Vertical[]>;
  selectedCategory: string = null;
  isCategorySelected: boolean = false;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.loadAllVerticals(); 
    // populate serach value on page reloa d
    this.categoryService.searchValueChanged$
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(res => {
      this.searchInput.nativeElement.value = res
    })
    this.queryField.valueChanges
    .pipe(
      debounceTime(DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap((search: string) => this.loadSuggestions(search)),
      map(res => this.filteredOptions$ = of(res)),
      takeUntil(this.componentDestroyed$)
    ).subscribe(noop);
  }

  ngAfterViewInit(): void {
    this.categoryService.clearSearchText.subscribe(
      (str) => {
        this.categoryService.searchText = null;
        this.searchInput.nativeElement.value = '';
        this.queryField.patchValue('');
        this.queryField.updateValueAndValidity();
      }
    );
    // fromEvent<any>(this.searchInput.nativeElement, 'focus')
    // .pipe(
    //   map(event => event.target.value),
    //   switchMap(value => this.loadSuggestions(value)),      
    //   first()
    // ).subscribe(res => {
    //   this.filteredOptions$ = of(res)
    // })

    // fromEvent<any>(this.searchInput.nativeElement, 'keyup')
    // .pipe(
    //   map(event => event.target.value),
    //   debounceTime(DEBOUNCE_TIME),
    //   distinctUntilChanged(),
    //   switchMap((search: string) => this.loadSuggestions(search)),
    //   takeUntil(this.componentDestroyed$)
    // ).subscribe(res => {
    //   this.filteredOptions$ = of(res)
    // })
  }

  loadAllVerticals() {
    this.allCategories$ = this.searchService.getAllVerticals();
  }

  search() {
    const searchVal: string = this.searchInput.nativeElement.value;
    if(searchVal && searchVal.length >=2) {
      this.navigateToCategoryPage();
    }
  }

  clearAllResults(event: any) {
    // this.filteredOptions$ = of([]);
    this.filteredOptions$ = this.searchService.deleteSearchHistory();
  }

  selectCategory(category: Vertical) {
    this.selectedCategory = category.name;
    this.isCategorySelected = true;
  }

  loadSuggestions(search: string): Observable<SearchSuggestion[]> {
    this.isSearchDisabled = true;
    if(search.length >=2) {
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

  fetchSearchHistory(event: any) { 
    this.searchInput.nativeElement.classList.add('search-input-focus');
    // console.log('valueueuueu:::', event.target.value);
    const searchVal = event.target.value;
    if(!searchVal) {
      this.filteredOptions$ = this.loadSuggestions(searchVal);
    }
  }

  removeClass() {
    this.searchInput.nativeElement.classList.remove('search-input-focus') 
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const searchVal: string = event.option.value.title || event.option.value.searchText;
    this.searchInput.nativeElement.value = searchVal;
    // const categoryId: string = event.option.value.categoryId;
    // this.categoryService.setCategoryId(categoryId);
    this.router.navigate(['/category'], { queryParams: { searchText: searchVal }});
   }

  navigateToCategoryPage() {
    const searchTextVal = this.searchInput.nativeElement.value;
    searchTextVal ? 
      this.router.navigate(['/category'], { 
        queryParams: { 
          searchText: searchTextVal 
        }
      })
    : this.router.navigate(['/category']);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
