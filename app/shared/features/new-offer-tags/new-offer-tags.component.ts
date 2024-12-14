import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllDesireTypes, OFFER_DESIRE_TYPE } from '@gintaa/modules/create-offer/configs/create-offer.config';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { selectOfferInfo } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { AvailableTags, Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-new-offer-tags',
  templateUrl: './new-offer-tags.component.html',
  styleUrls: ['./new-offer-tags.component.scss']
})
export class NewOfferTagsComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  allAvailbleTags: AvailableTags[] = [];
  presentTagArr: AvailableTags[] = [];
  isAddFeature: boolean = false;
  newValue: string;
  selectedTagForAddValue: AvailableTags = null;
  isAddNewValue: boolean = false;
  currentlyAvailableFacets: any[] = [];
  form: FormGroup = new FormGroup({});
  categoryId: string;
  selectedFacetsLength: number = 0;
  selectedMandoryFacetsLength: number = 0;
  offer: Offer;

  constructor(
    private store: Store<gintaaApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(CreateOfferActions.getAllTagsByCategoryId());
    this.store.pipe(
      select(selectOfferInfo),
    ).subscribe((offer: Offer) => {
        this.offer = offer;
        this.allAvailbleTags = offer.tags && offer.tags.length ? [
          ...offer.tags.filter(tag => tag.mandatory),
          ...offer.tags.filter(tag => !tag.mandatory)
        ] : [];
        this.currentlyAvailableFacets = offer.facets && offer.facets.length ? 
        offer.facets.filter(obj => obj.name) : [];    
        // all selected
        this.selectedFacetsLength = this.currentlyAvailableFacets?.length;
        this.selectedMandoryFacetsLength = this.currentlyAvailableFacets.length ? 
        this.currentlyAvailableFacets.filter(obj => obj.mandatory).length : 0;

        if(offer.facets && offer.facets.length && this.allAvailbleTags.length) {  
          // console.log('Available tags from store::', this.allAvailbleTags);
          this.presentTagArr = this.allAvailbleTags.filter(obj => !this.currentlyAvailableFacets.some(obj2 => obj.name == obj2.name)); 
        } // if facet not present then below condition need to check
        else if(this.allAvailbleTags.length) {
          this.presentTagArr = this.allAvailbleTags;
        }
        this.updateNextButtonState();
    });    
  }

  updateNextButtonState() {
    const selectedFacetsArray = this.offer.facets && this.offer.facets.length ? this.offer.facets.filter(obj => obj.name !== null) : [];
    const selectedMandatoryFacetsLength = selectedFacetsArray.length ? selectedFacetsArray.filter(obj => obj.mandatory).length : 0;
    const mandatoryTagsLength = this.offer.tags && this.offer.tags.filter(x => x.mandatory).length;
    // initially disabled accordion three
    this.store.dispatch(CreateOfferActions.disableAccordionThree());
    this.store.dispatch(CreateOfferActions.disablePostOfferSection());
    if (((selectedMandatoryFacetsLength == mandatoryTagsLength) && selectedMandatoryFacetsLength > 0)
      || (mandatoryTagsLength === 0 && selectedFacetsArray.length > 0)) {
      this.store.dispatch(CreateOfferActions.enableAccordionThree());
      if ((this.offer.exchangeMode !== AllDesireTypes.OFFER_DESIRE_EXCHANGE) || this.offer.auctioned) {
        this.store.dispatch(CreateOfferActions.enablePostOfferSection());
      } else if (this.offer.desire?.desireType === OFFER_DESIRE_TYPE.ANYTHING || this.offer.desire?.description) {
        this.store.dispatch(CreateOfferActions.enablePostOfferSection());
      }
    } 
  }

  selectedFacets(label: string, name: string, value: string, tagId: string, mandatory: boolean) {
    this.isAddNewValue = false;
    this.newValue = '';
    const selectedFacet = {
      name: name,
      label: label,
      values: [value],
      mandatory: mandatory
    }
    const offer = {
      offerType: this.offer.offerType,
      offerId: this.offer?.draftOfferId,
      categoryId: this.offer?.category?.categoryId,
      facets: [...this.offer.facets, selectedFacet]
    }
    this.store.dispatch(CreateOfferActions.updateDraftOffer({offer, updateSingle: 'facets'})) 
  }

  removeSelected(tag) {
    let facets = this.offer.facets.filter(obj => obj.name !== tag.name);
    const offer = {
      offerType: this.offer.offerType,
      offerId: this.offer?.draftOfferId,
      categoryId: this.offer?.category?.categoryId,
      facets: facets
    }
    this.store.dispatch(CreateOfferActions.updateDraftOffer({offer, updateSingle: 'facets'})) 
  }

  // add delete new values for specific tags

  selectedTagForNewValue(selectedTag: AvailableTags) {
    this.selectedTagForAddValue = selectedTag;
    this.isAddNewValue = true;
  }

  addNewValue() {
    if (this.newValue && this.newValue.trim() !== '') {
      const updatedObj: AvailableTags = {
        ...this.selectedTagForAddValue,
        values: [...this.selectedTagForAddValue.values, this.newValue]
      }      
      this.allAvailbleTags = this.allAvailbleTags.map((obj) => ({
        ...obj,
        values: obj.name === updatedObj.name ? updatedObj.values : obj.values
      }));
      this.presentTagArr = this.allAvailbleTags.filter(obj => !this.currentlyAvailableFacets.some(obj2 => obj.name == obj2.name));
      this.store.dispatch(CreateOfferActions.setAllTags({tags: this.allAvailbleTags}))
      this.isAddNewValue = false;
      this.newValue = '';
    }
  }

  deleteNewValue() {
    this.isAddNewValue = false;
    this.newValue = '';
  }

  enableAddFeature(): void {    
    this.form.addControl("featureKey", new FormControl('', Validators.required));
    this.form.addControl("featureValue", new FormControl('', Validators.required));
    this.isAddFeature = true;
  }

  addNewFeature() {
      const newFeatureKey = this.form.get('featureKey').value;
      const newFeatureValue = this.form.get('featureValue').value;
      const newFacet = {
        name: newFeatureKey,
        label: newFeatureKey,
        values: [newFeatureValue],
        mandatory: false,
        selected: true
      }
      // update draft offer with new facet
      const offer = {
        offerType: this.offer.offerType,
        offerId: this.offer?.draftOfferId,
        categoryId: this.offer?.category?.categoryId,
        facets: [...this.offer.facets, newFacet],
        tags: [...this.offer.tags, newFacet]
      }
      this.store.dispatch(CreateOfferActions.updateDraftOffer({offer, updateSingle: 'facets'})) 
      this.form.reset();
      this.isAddFeature = false;           
  }

  deleteFeatureInput() {    
    this.form.reset();
    this.isAddFeature = false;
  }

  get mandatorySelected() {
    return this.allAvailbleTags.length && this.allAvailbleTags.filter(x => x.mandatory).length;
  }

  get isFeatureNewValueEnabled() {
    return (this.newValue && this.newValue.trim() !== '')
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
