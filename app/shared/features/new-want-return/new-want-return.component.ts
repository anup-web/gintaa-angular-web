import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEBOUNCE_TIME } from '@gintaa/config/constant.config';
import { AllDesireTypes, offerDesireTypes, OFFER_DESIRE_TYPE } from '@gintaa/modules/create-offer/configs/create-offer.config';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { selectOfferInfo } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-new-want-return',
  templateUrl: './new-want-return.component.html',
  styleUrls: ['./new-want-return.component.scss']
})
export class NewWantReturnComponent implements OnInit {

  public desire: FormGroup;
  desireTypeArr: string[] = offerDesireTypes;
  selected: number = 0;
  offer: Offer;
  showDesireSection: boolean = true;
  wantReturnPlaceholder: string = '32 inch tv branded';

  constructor(
    private fb: FormBuilder,    
    private store: Store<gintaaApp.AppState>
  ) {
    this.desire = this.fb.group({
      description: ['', { validators: [Validators.required], updateOn: "blur" }],
      desireType: [this.desireTypeArr[0], { validators: Validators.required }],
      tags: this.fb.array([]),
      categoryId: null
    })
  } 

  ngOnInit(): void {
    //this.form = <FormGroup>this.controlContainer.control;
    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe((currentOffer: Offer) => {
      this.offer = currentOffer;
      if (this.offer.exchangeMode === AllDesireTypes.OFFER_DESIRE_MONEY) {
        this.desire.get('description').setValue('');
      } else {
        this.desire.get('description').setValue(this.offer.desire?.description);
        if (this.offer.desire?.desireType) {
          this.desire.get('desireType').setValue(this.offer.desire?.desireType);
          this.selected = this.desireTypeArr.findIndex(type => type === this.offer.desire?.desireType);
        } else {
          this.desire.get('desireType').setValue(this.desireTypeArr[0]);
          this.selected = 0;
        }

        if (this.offer.desire?.desireType === OFFER_DESIRE_TYPE.ANYTHING) {
          this.showDesireSection = false;
        } else if (!this.offer.desire) {
          this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
            key: 'desireType',
            value: OFFER_DESIRE_TYPE.ANYTHING,
            formGroupName: 'desire'
          }));
          this.showDesireSection = false;
        } else {
          this.showDesireSection = true;
        }
      }
    })
    setTimeout(() => {
      Object.keys(this.desire.controls).forEach(control => {
        this.saveDraftOnFormControlChange(control);
      });
    }, 1000)
  }

  setDesire(desireType: string, index: number) {
    this.desire.get('desireType').setValue(desireType);
    this.desire.get('desireType').updateValueAndValidity();
    this.selected = index;
    if (desireType === OFFER_DESIRE_TYPE.ITEM) {
      this.wantReturnPlaceholder = '32 inch tv branded';
      this.store.dispatch(CreateOfferActions.updateCurrentActiveSection({ name: 'WantInReturnItem' }));
    } else if (desireType === OFFER_DESIRE_TYPE.SERVICE) {
      this.wantReturnPlaceholder = 'Please specify your service';
      this.store.dispatch(CreateOfferActions.updateCurrentActiveSection({ name: 'WantInReturnService' }));
    } else if (desireType === OFFER_DESIRE_TYPE.ANYTHING) {
      this.store.dispatch(CreateOfferActions.updateCurrentActiveSection({ name: 'WantInReturnAnything' }));
    }

  }

  saveDraftOnFormControlChange(control) {
    this.desire.get(control).valueChanges
    .pipe(
      debounceTime(DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value && this.desire.get(control).valid) {
        this.sendToStore(control);
      }
    })
  }

  sendToStore(control: any) {
    const offer = {
      offerType: this.offer && this.offer.offerType,
      offerId: this.offer && this.offer.draftOfferId,
      categoryId: this.offer.category?.categoryId,
      desire: {
        ...this.desire.value,
        category: control === 'desireType' ? null : this.offer?.desire?.category,
        categoryId: control === 'desireType' ? null : this.offer?.desire?.categoryId,
      },
    }
    this.store.dispatch(CreateOfferActions.updateDraftOffer({offer, updateSingle: 'desire'}))
  }
}
