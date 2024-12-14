import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DEBOUNCE_TIME } from '@gintaa/config/constant.config';
import { CreateOfferService } from '@gintaa/modules/create-offer/services/create-offer.service';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { allVerticalCategorySelector, selectOfferInfo } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-offer-all-categories',
  templateUrl: './offer-all-categories.component.html',
  styleUrls: ['./offer-all-categories.component.scss']
})
export class OfferAllCategoriesComponent implements OnInit {

  isShowDivIfh: boolean;
  @Input() isDesire: boolean = false;
  allVerticals$: Observable<any[]>;
  allCurrentCategories$: Observable<any[]>;
  previousCategories$: Observable<any[]>;
  _offerType: string = null;
  filteredOptions$: Observable<any[]>;
  searchCategory: FormControl = new FormControl();
  offerCategoryControl: FormControl = new FormControl();
  showVericals: boolean = true;
  selectedCurrentCategory: string = null;
  selectedPreviousCategoryArr: string[] = [];
  depth: number = 0;
  currentStep: number = 1;
  offer: Offer;
  offerName: string;
  suggestedCategories: any[] = [];

  constructor(
    private store: Store<gintaaApp.AppState>,
    private createOfferService: CreateOfferService
  ) { }

  ngOnInit(): void {
    this.allVerticals$ = this.store.pipe(
      select(allVerticalCategorySelector)
    );
    this.store.pipe(select(selectOfferInfo))
      .subscribe((res: Offer) => {
        this.offer = res;
        this._offerType = this.offer.offerType;
        this.offerName = this.offer.description;
        this.suggestedCategories = this.offer.suggestedCategories;
        // execute for draft offer only
        if (this.offer.draftOfferId && this.offer.category && !this.isDesire) {
          // this.offerCategoryControl.setValue(this.offer.category.breadcrumbs.join('/'));
          this.offerCategoryControl.setValue(this.offer.category.breadcrumbs[this.offer.category.breadcrumbs.length - 1]);
        } 
        else if(this.offer.draftOfferId && this.isDesire && this.offer?.desire?.category) {
          // this.offerCategoryControl.setValue(this.offer.desire.category.breadcrumbs.join('/'));
          this.offerCategoryControl.setValue(this.offer.desire.category.breadcrumbs[this.offer.desire.category.breadcrumbs.length - 1]);
        } 
        else if(this.offer.draftOfferId && !this.offer.category && !this.isDesire) {
          this.offerCategoryControl.setValue(null);
        }
      });

    this.filteredOptions$ = this.searchCategory.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        switchMap((search: string) => this.loadCategorySuggestions(search))
      );
  }

  loadCategorySuggestions(search: string): Observable<any[]> {
    let type = this._offerType;
    if (search.length >= 2) {
      //return this.createOfferService.getSuggestionCategory(search, this._offerType);
      if(this.isDesire) {
        type = this.offer.desire.desireType;
      }
      return this.createOfferService.getSuggestionCategory(search, type);
    }
    return of([]);
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const searchVal: string = event.option.value.breadcrumbs[event.option.value.breadcrumbs.length - 1];
    this.searchCategory.setValue(null);
    this.offerCategoryControl.setValue(searchVal);
    const categoryId: string = event.option.value.categoryId;
    this.sendToStore(categoryId);
    this.isShowDivIfh = false;
  }

  openParentCategories(vertical: any) {
    this.selectedCurrentCategory = vertical.label;
    this.selectedPreviousCategoryArr.push(this.selectedCurrentCategory);
    const parentCategories$ = this.createOfferService.findRootCategories(vertical.verticalId);
    this.showVericals = false;
    this.currentStep += 1;
    this.allCurrentCategories$ = parentCategories$;
  }

  openChildCategories(category: any) {
    this.selectedCurrentCategory = category.label;
    if (this.depth > 0) {
      this.selectedPreviousCategoryArr.push(this.selectedCurrentCategory);
    }
    this.depth += 1;
    const childCategories$ = this.createOfferService.findCategoryTree(category.categoryId, this.depth.toString());
    this.currentStep += 1;
    this.previousCategories$ = this.allCurrentCategories$;
    this.allCurrentCategories$ = childCategories$;
    this.showVericals = false;
  }

  selectCategory(category: any) {
    this.depth = 0;
    // this.offerCategoryControl.setValue(category.breadcrumbs.join('/'));
    this.offerCategoryControl.setValue(category.breadcrumbs[category.breadcrumbs.length - 1]);
    const categoryId: string = category.categoryId;
    this.sendToStore(categoryId);
    this.isShowDivIfh = false;
  }

  backToPreviousCategory() {
    if (this.depth > 0) {
      this.depth -= 1;
    } else {
      this.depth = 0
    }
    this.currentStep -= 1;
    this.selectedCurrentCategory = this.selectedPreviousCategoryArr.pop();
    this.allCurrentCategories$ = this.previousCategories$
    this.showVericals = this.currentStep === 1;
  }

  sendToStore(categoryId) {
    if(this.isDesire) {
      const offer = {
        offerType: this._offerType,
        offerId: this.offer.draftOfferId,
        categoryId: this.offer.category && this.offer.category.categoryId,
        desire: {
          ...this.offer.desire,
          category: null,
          categoryId
        }
      }
      this.store.dispatch(CreateOfferActions.updateDraftOffer({ offer, updateSingle: 'desire' }));
    } else {
      const offer = {
        offerType: this._offerType,
        offerId: this.offer.draftOfferId,
        categoryId,
        facets: [],
      }
      this.store.dispatch(CreateOfferActions.updateDraftOffer({ offer, updateSingle: 'category' }));
    } 

    // this.store.dispatch(CreateOfferActions.clearFacets())
    if (this.offerName && !this.isDesire) {
        const coverImage = this.offer.images && this.offer.images.find(image => image.cover)
        const imageLogos = coverImage ? coverImage.imageLogos : [];
        const reqBody = {
          //categoryId: this.offer.category && this.offer.category.categoryId,
          categoryId,
          text: this.offerName,
          logo: [...imageLogos]
        }
      this.store.dispatch(CreateOfferActions.selectedTagsByUserInfo({reqBody}));
    }
  }

  resetCategory() {
    this.isShowDivIfh = !this.isShowDivIfh;
    // reset to initial vertical categories
    this.showVericals = true;
    this.depth = 0;
    this.selectedCurrentCategory = null;
    this.currentStep = 1;
  }

  showCategory(category) {
    return `${category.breadcrumbs[category.breadcrumbs.length - 2]} / ${category.breadcrumbs[category.breadcrumbs.length - 1]}`
  }
}
