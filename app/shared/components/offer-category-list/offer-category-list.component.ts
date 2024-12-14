import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Vertical } from '@gintaa/core/models/Category';
import { CreateOfferService } from '@gintaa/modules/create-offer/services/create-offer.service';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { allVerticalCategorySelector, selectOfferInfo } from '@gintaa/modules/create-offer/store/create-offer.selectors';
import { UserOfferInfo } from '@gintaa/modules/create-offer/store/models/user-offer-info';
import { OfferTypes } from '@gintaa/modules/my-offers/configs/my-offer.enum';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-offer-category-list',
  templateUrl: './offer-category-list.component.html',
  styleUrls: ['./offer-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCategoryListComponent implements OnInit {

  @ViewChild('selectedTagInput', { static: false }) selectedTagInput: ElementRef<HTMLInputElement>;
  @ViewChild('addTagInput', { static: false }) addTagInput: ElementRef<HTMLInputElement>;
  selectable = true;
  removable = true;
  addOnBlur = true;
  addOnBlurTagInput = false;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  items: any[] = [];
  itemsTags: any[] = [];
  itemsDraftTags: any[] = [];
  draftOfferId: string = null;
  @Input('type') chipType: string;
  @Output() selectedCustomDesireTag = new EventEmitter<string[]>();
  allDesireCategories$: Observable<Vertical[]>;
  allTags$: Observable<any>;
  addTagPresent: boolean;
  itemTagPresent: boolean;
  customTags: string[] = []; 
  public form: FormGroup;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private offerService: CreateOfferService,
    private controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = <FormGroup>this.controlContainer.control;
    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe((offer: UserOfferInfo) => {
      if(offer.draftOfferId) {
        if(offer.desireCategory && offer.desireCategory.categoryId) {
          let { hierarchy, leafNode, tags, vertical } = offer.desireCategory;
          this.items = hierarchy.map(item=> ({ ...item, leafNode }));
          if(this.items.length && offer.desire.tags.length && leafNode) {
          let values = offer.desire.tags.map(item => {
            // return item.values.map(value => ({ label: value , name: item.label, tagId: '' }))
          });
          values = values.reduce((a,b) => a.concat(b), []);
          this.items = [...this.items, ...values];
          // tags = tags.filter( function( item ) {
          //   for( var i=0, len=values.length; i<len; i++ ){
          //       if( values[i].name == item.label ) {
          //           item.values = item.values.filter(e => e !== values[i].label)
          //       }
          //   }
          //   return true;
          // });
        // console.log('Tags::::::', tags);
        this.itemsDraftTags = tags;
        }
        // this.categories = [...this.categories, {label, categoryId, leafNode}];
        this.offerService.setFinalTags(this.items);
        if(this.items.length === 1) {
          // this.allCategories$ = this.offerService.findRootCategories(categoryId); 
        } else {
          if(!leafNode) {
            // this.allCategories$ = this.offerService.findCategoryTree(categoryId); 
          } else {
            this.itemTagPresent = true;
            this.allTags$ = of(tags);
          }
        } 
        } else {
          this.allDesireCategories$ = this.store.pipe(select(allVerticalCategorySelector));
        }
      } else if(offer.offerStage && offer.offerStage.toLowerCase() === OfferTypes.Published.toLowerCase()) {
        if(offer.desireCategory && offer.desireCategory.categoryId) {
          let { hierarchy, leafNode } = offer.desireCategory;
          this.items = hierarchy.map(item=> ({ ...item, leafNode }));
        } 
      } else {
        if(offer.desireCategory && offer.desireCategory.categoryId) {
          this.items = [offer.desireCategory]// for normal back
          this.allDesireCategories$ = of([]);
        } else {
          this.allDesireCategories$ = this.store.pipe(select(allVerticalCategorySelector));
        } 
      }
    })
  }

  // selected tags methods

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      //this.items.push({name: value});
      this.items.push(value);
    }
    // Clear the input value
    event.value = '';
  }

  remove(item: any, index: number): void {
    this.store.dispatch(CreateOfferActions.removeSelectedDesireCategory())
    const initialTagArr = [...this.items];
    let lastElementInitialTagArr = initialTagArr[initialTagArr.length - 1];
    const removeElement = item;    
    if (index >= 0 && this.items.length === 1) {
      this.items.splice(index, 1);
      this.itemTagPresent = false;
      this.allDesireCategories$ = this.store.pipe(select(allVerticalCategorySelector));
    }

    if(index >=0 && this.items.length > 1) {
      const isLeaf = removeElement.categoryId ? removeElement.leafNode : null;
      if(!isLeaf) {
        this.items.splice(index, 1);
      } else {
        this.items.length = index;
        lastElementInitialTagArr.categoryId = removeElement.categoryId;
      }
    }

    if(this.items.length) {
      const catId: string = removeElement.categoryId;
      const tagId: string = removeElement.tagId;
      const tagName: string = removeElement.name;
      if(tagId) {
        this.itemsTags.forEach(tag => {
          if(tag.tagId === tagId) {
            tag.values = [removeElement.value, ...tag.values];
          } 
        })      
        this.allTags$ = of(this.itemsTags);
      }
      
      // logic execute for draft offer with selected tags
      if(tagId === '' && tagName) {
        this.itemsDraftTags.forEach(tag => {
          if(tag.label === tagName) {
            tag.values = [removeElement.label, ...tag.values];
          } 
        })      
        this.allTags$ = of(this.itemsDraftTags);
      }

      if(!tagId && catId && lastElementInitialTagArr.categoryId === catId) {
        this.itemTagPresent = false;
        const presentTagArray = [...this.items];
        const lastElementPresentTagArr = presentTagArray[presentTagArray.length - 1];
        let {label, categoryId, leafNode} = lastElementPresentTagArr
        this.allDesireCategories$ = this.getDesireCategoriesOnRemove(leafNode, categoryId);
      }       
    }
    this.offerService.setDesireSelectedTags(this.items); 
  }

  getDesireCategoriesOnRemove(leafNode: any, categoryId: any, tagId?: any) { 
    if(leafNode) {      
      return this.offerService.getAllTagsByCategoryId(categoryId)
    } else if(this.items.length === 1) {
      return this.offerService.findRootCategories(categoryId)
    } else {
      return this.offerService.findCategoryTree(categoryId)    
    }    
  }

  // suggested tag methods

  removeSuggestedCategories(suggestion: any, index: number) {
    // console.log('Selected tag array::', this.items);
    this.itemTagPresent = false;
    if(!this.items.length) {
      //this.allDesireCategories$ = this.
    }

    if(!('leafNode' in suggestion)) {
      const {label, verticalId, url} = suggestion;
      this.items = [...this.items, {label, categoryId: verticalId, url}];
    } else {
      const {label, categoryId, leafNode} = suggestion;
      this.items = [...this.items, {label, categoryId, leafNode}];
    }     
    if(this.items.length >= 1) {
      if(!('leafNode' in suggestion)) {
        this.allDesireCategories$ = this.offerService.findCategoryTree(suggestion.verticalId);
      } else {
        if(!suggestion.leafNode) this.allDesireCategories$ = this.offerService.findCategoryTree(suggestion.categoryId);
        else {
          this.itemTagPresent = true;
          this.store.dispatch(CreateOfferActions.addSelectedDesireCategory({formValue: this.form.value, category: suggestion}))
          this.allTags$ = this.offerService.getAllTagsByCategoryId(suggestion.categoryId);
        }
      }
    }
    // console.log('Selected tag array after final::', this.items);
    this.offerService.setDesireSelectedTags(this.items);
  }

  removeSuggestedTags(value: string, valueIndex: number, tagArrayIndex: number, tagArray: any) {
    const item = tagArray[tagArrayIndex];
    const { label: facetLabel, values, tagId } = item;
    const selectedValue = values[valueIndex];     
    this.items = [...this.items, { facetLabel, label: selectedValue, value: selectedValue, tagId }];
    this.selectedTagInput.nativeElement.value = '';
    item.values = item.values.filter(value => value !== selectedValue);
    tagArray[tagArrayIndex] = item;
    this.itemsTags = tagArray;
    this.allTags$ = of(this.itemsTags);
    this.offerService.setDesireSelectedTags(this.items);
  }

  // custom tag related functionalities

  removeCustomTag(tag: string): void {
    const index = this.customTags.indexOf(tag);
    if (index >= 0) {
      this.customTags.splice(index, 1);
    }
  }

  addCustomTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.customTags = [...this.customTags, value.trim()];
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  saveCustomTags() {
    if(!this.customTags.length) {
      return false;
    }
    this.selectedCustomDesireTag.emit(this.customTags);
    this.customTags = [];
  }

}
