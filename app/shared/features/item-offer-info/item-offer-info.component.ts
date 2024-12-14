import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { OfferAddress } from '@gintaa/core/models';
import { itemOfferError } from '@gintaa/modules/create-offer/configs/create-offer-error.config';
import {
  AllDesireTypes,
  CREATE_OFFER_TITLE, CREATE_OFFER_TYPE, ItemOfferQuantityUnits, OfferExchangeTypes, OfferQuantityUnits, OFFER_CONDITION
} from '@gintaa/modules/create-offer/configs/create-offer.config';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import {
  allAddressSelector, allBusinessAddressSelector, allCountrySelector, selectOfferInfo
} from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { Country, Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewAddAddressComponent } from '../add-address-popup/add-address/add-address.component';
import { StorageService } from '@gintaa/core/services/storage.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { environment } from '@gintaa/env';
// import { CustomPriceValidator } from './custom-price.validator';

@Component({
  selector: 'app-item-offer-info',
  templateUrl: './item-offer-info.component.html',
  styleUrls: ['./item-offer-info.component.scss']
})
export class ItemOfferInfoComponent implements OnInit {

  public form: FormGroup;
  exchangeTypeArr: AllDesireTypes[] = OfferExchangeTypes;
  offerErrors = itemOfferError;
  offerConditions: string[] = [];
  itemQuantityUnits = ItemOfferQuantityUnits;
  selected: number = -1;
  private _offerType: string = null;
  allAddressSub$: Observable<OfferAddress[]>;
  allCountryLists$: Observable<Country[]>;
  offer: Offer;
  offerTitle: string;
  offerTitleHelp: string = null;
  calculatedDiscount: string = null;
  isAuction: boolean = false;
  triggerFormChange: boolean = false;
  discPriceError: string = null;
  auctionPriceError: string = null;
  moqError: string = null;
  hsnCodeError: string = null;
  minDate: Date = new Date(Date.now());
  maxDate: Date = new Date(Date.now() + 6.048e+8);
  dateTimePickerConfig = {
    showSpinners: true,
    showSeconds: true,
    stepHour: 1,
    stepMinute: 1,
    stepSecond: 1,
    touchUi: false,
    color: 'accent',
    enableMeridian: false,
    disableMinute: false,
    hideTime: false,
  };
  disableTempFields = {};
  currentBusinessId: string;
  defaultAddressSaved: boolean = false;
  defaultExchangeTypeSaved: boolean = false;
  auctionDateTime: any = null;
  auctionDateDefaultValueSaved: boolean = false;
  offerLaunchDate = environment.offerLaunchDate;
  showTaxClass: boolean = true;

  minimumBidStepError: string = null;

  constructor(
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<gintaaApp.AppState>,
    public dialog: MatDialog,
    private storageService: StorageService,
  ) {
    this._offerType = this._route.snapshot.data['offerType'];
    this.createForm();

    if (this._offerType === CREATE_OFFER_TYPE.AUCTION) {
      this.isAuction = true;
      this.offerTitle = CREATE_OFFER_TITLE.AUCTION_TITLE;
      this.offerTitleHelp = CREATE_OFFER_TITLE.AUCTION_TITLE_HELP;
      this.offerConditions = [OFFER_CONDITION.USED, OFFER_CONDITION.REFURBISHED, OFFER_CONDITION.ANTIQUE, OFFER_CONDITION.NEW];
    } else if (this._offerType === CREATE_OFFER_TYPE.ITEM) {
      this.isAuction = false;
      this.offerTitle = CREATE_OFFER_TITLE.ITEM_TITLE;
      this.offerTitleHelp = CREATE_OFFER_TITLE.ITEM_TITLE_HELP;
      this.offerConditions = [OFFER_CONDITION.USED, OFFER_CONDITION.REFURBISHED, OFFER_CONDITION.NEW];
    }
  }

  private createForm() {
    this.form = this.fb.group({
      description: [null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(3000),
        ],
      }],
      quantity: [1, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(99999999),
          Validators.minLength(1),
          Validators.maxLength(6),
          Validators.pattern(APP_CONFIGS.HAS_NUMBER_ONLY_2)
        ],
      }],
      unit: [OfferQuantityUnits.TYPE_PIECE, { validators: [Validators.required] }],
      unitOfferValuation: [0, {
        validators: [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.max(99999999),
          Validators.pattern(APP_CONFIGS.HAS_DECIMAL)
        ],
      }],
      itemCondition: [null, { validators: [Validators.required] }]
    });
  }

  ngOnInit(): void {
    this.addDynamicFormControls(this.isAuction);
    this.allAddressSub$ = this.store.pipe(select(allAddressSelector));
    this.allCountryLists$ = this.store.pipe(select(allCountrySelector));

    const selectedBusiness = this.storageService.getSelectedBusiness();

    if (selectedBusiness && selectedBusiness.businessId) {
      this.addBusinessFormControls();
      this.currentBusinessId = selectedBusiness?.businessId || null;
      if (this.currentBusinessId) {
        this.fetchBusinessDetails(this.currentBusinessId);
        this.allAddressSub$ = this.store.pipe(select(allBusinessAddressSelector));
      }
    }

    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe(currentOffer => {
      this.offer = { ...currentOffer };
      this._offerType = currentOffer.offerType;
      if (currentOffer.draftOfferId) {

        if (!currentOffer.auctionInfo?.endDate || !currentOffer.auctionInfo?.end) {
          this.minDate = new Date(Date.now() + 86400000);
          this.maxDate = new Date(Date.now() + 6.048e+8 + 10000);

          if (this.offerLaunchDate) {
            const oneDay = 24 * 60 * 60 * 1000;
            const date1 = new Date(Date.now());
            const date2 = new Date(this.offerLaunchDate);
            console.log('>>>>>>>>>>> lauch date set:', date2, this.offerLaunchDate);
            const diffTime = Math.abs(+date2 - +date1);
            const diffDays = Math.ceil(diffTime / oneDay);

            if (diffDays > 0) {
              console.log('>>>>>>>>>>> adding days ', diffDays);
              this.minDate = new Date(Date.now() + diffDays * 86400000);
              this.maxDate = new Date(Date.now() + diffDays * 86400000 + 6.048e+8 + 10000);
              console.log('>>>>>>>>>>> new min date ', this.minDate);
              console.log('>>>>>>>>>>> new max date ', this.maxDate);
            }
          }

          console.log('>>>>>>>>>>> set date as min date', this.auctionDateTime);
          this.auctionDateTime = this.minDate;
          const dateStr = this.minDate.toISOString();
          const formattedDateVal = dateStr.substr(0, dateStr.length - 1) + '+0530';
          // console.log(dateStr, formattedDateVal);
          if (!this.auctionDateDefaultValueSaved) {
            this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
              key: 'endDate',
              value: formattedDateVal,
              formGroupName: 'auctionInfo'
            }));
            this.auctionDateDefaultValueSaved = true;
          }
        }

        if (currentOffer.exchangeMode === AllDesireTypes.OFFER_DESIRE_MONEY && !this.form.get("price")) {
          this.form.addControl(
            "price",
            this.fb.control(0, {
              validators: [
                Validators.required,
                Validators.min(1),
                Validators.minLength(1),
                Validators.maxLength(10),
                Validators.pattern(APP_CONFIGS.HAS_DECIMAL),
              ],
            })
          );
          this.form.addControl(
            "negotiable",
            this.fb.control(false)
          );
          this.saveDraftOnFormControlChange('price');
          this.saveDraftOnFormControlChange('negotiable');
        }

        // SH - 08/10/2021
        // for OFFER_DESIRE_FREE and business listing hide taxclass
        if (currentOffer.exchangeMode === AllDesireTypes.OFFER_DESIRE_FREE) {
          // console.log('>>>>>>>> removed taxclass');
          this.showTaxClass = false;
          this.form.removeControl("taxClass");
        } else {
          // add the control
          if (!this.form.get("taxClass") && selectedBusiness && selectedBusiness?.businessId) {
            this.form.addControl(
              "taxClass",
              this.fb.control(null, {
                validators: [
                  Validators.required,
                  Validators.minLength(1),
                  Validators.maxLength(15),
                ],
              })
            );
          }
        }

        if (currentOffer.price && currentOffer.unitOfferValuation) {
          this.calculateProductDiscount(+currentOffer.unitOfferValuation, +currentOffer.price);
        }
        if (currentOffer.itemCondition) {
          this.selected = this.offerConditions.findIndex(condition => condition === currentOffer.itemCondition);
        }

        // SH - Sanity check
        if (Object.keys(currentOffer)) {
          this.patchValue({ ...currentOffer }, { emitEvent: false });
        }

        // FORCE UPDATE quantity to 1
        if (!currentOffer.quantity) {
          this.form.get('quantity').patchValue(1, { onlySelf: true, emitEvent: false });
          this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
            key: 'quantity',
            value: 1,
            formGroupName: null
          }));
        }
        // FORCE UPDATE Unit to Piece
        if (!currentOffer.unit) {
          this.form.get('unit').patchValue(OfferQuantityUnits.TYPE_PIECE, { onlySelf: true, emitEvent: false });
          this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
            key: 'unit',
            value: OfferQuantityUnits.TYPE_PIECE,
            formGroupName: null
          }));
        }
        // FORCE UPDATE Item Condition
        if (!currentOffer.itemCondition) {
          if (selectedBusiness && selectedBusiness.businessId) {
            this.selected = this.offerConditions.length - 1;
            this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
              key: 'itemCondition',
              value: OFFER_CONDITION.NEW,
              formGroupName: null
            }));
          } else {
            this.selected = 0;
            this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
              key: 'itemCondition',
              value: OFFER_CONDITION.USED,
              formGroupName: null
            }));
          }
        }

        // FORCE UPDATE LOCATION
        if (!currentOffer.location && !this.defaultAddressSaved) {
          this.saveDefaultLocation();
        }

        // UPDATE LISTING FOR = Money FOR BUSINESS
        if (!this.defaultExchangeTypeSaved && !this.isAuction && !currentOffer.exchangeMode) {
          this.defaultExchangeTypeSaved = true;
          if (selectedBusiness && selectedBusiness.businessId) {
            this.setExchangeType(AllDesireTypes.OFFER_DESIRE_MONEY);
          } else {
            this.setExchangeType(AllDesireTypes.OFFER_DESIRE_EXCHANGE);
          }
        }

        // UPDATE productType FOR BUSINESS AS 'Simple Product'
        if (!currentOffer.productType && selectedBusiness && selectedBusiness.businessId) {
          this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
            key: 'productType',
            value: 'Simple Product',
            formGroupName: null
          }));
        }

        if (currentOffer.businessOffer && currentOffer.dimensions) {
          this.form.get('dimensions').patchValue(currentOffer.dimensions, { emitEvent: false });
          if (currentOffer.moq) {
            this.calculateMoqError(currentOffer.quantity, currentOffer.moq);
          }
        }

        /*****
         * calculate hsnCode validation
         * - only numbers
         * - can be 4|6|8 number length
         * - starts with ??
         */
        if (currentOffer.hsnCode) {
          if (currentOffer.hsnCode.length < 4 || currentOffer.hsnCode.length > 8) {
            // show form error
            this.hsnCodeError = null;
          } else {
            if (![4, 6, 8].includes(currentOffer.hsnCode.length)) {
              this.hsnCodeError = 'HSN Code can be 4/6/8 numbers';
            } else {
              this.hsnCodeError = null;
            }
          }
        }

        if (currentOffer.auctioned && currentOffer.auctionInfo) {
          this.form.get(`auctionInfo.basePrice`).patchValue(currentOffer.auctionInfo?.basePrice, { emitEvent: false });
          this.form.get(`auctionInfo.buyOutPrice`).patchValue(currentOffer.auctionInfo?.buyOutPrice, { emitEvent: false });
          this.form.get(`auctionInfo.stepPrice`).patchValue(currentOffer.auctionInfo?.stepPrice, { emitEvent: false });

          if (currentOffer.auctionInfo.basePrice && currentOffer.auctionInfo.buyOutPrice) {
            this.calculateAuctionError(currentOffer.auctionInfo.basePrice, currentOffer.auctionInfo.buyOutPrice);
          }

          // if (currentOffer.auctionInfo.buyOutPrice && currentOffer.auctionInfo.stepPrice) {
          this.checkStepPriceShouldNotGreaterThanBuyOutPrice();
          // }
        }
        if (currentOffer.auctioned && currentOffer.auctionInfo?.end) {
          // if (!this.auctionDateTime) {
          this.setActionEndDate(currentOffer.auctionInfo?.end);
          // }
        } else if (currentOffer.auctioned && currentOffer.auctionInfo?.endDate) {
          // if (!this.auctionDateTime) {
          // const formattedValue = currentOffer.auctionInfo?.endDate.split('+')[0] + 'Z';
          this.auctionDateTime = currentOffer.auctionInfo?.endDate;
          // }
        }
      }
    });

    Object.keys(this.form.controls).forEach(control => {
      if (control === 'auctionInfo') {
        ['basePrice', 'buyOutPrice', 'stepPrice'].forEach(control => {
          this.saveDraftOnFormControlChangeAuction(control);
        })
      } else if (control === 'dimensions') {
        this.saveDraftOnFormControlChangeDimension(control);
      } else {
        this.saveDraftOnFormControlChange(control);
      }
    });
  }

  setActionEndDate(end: any) {
    if (typeof end === 'string') {
      const formattedValue = end.split('+')[0] + 'Z';
      this.auctionDateTime = formattedValue;
    } else {
      // it means it's of type date
      const dateStr = new Date(end).toISOString();
      this.auctionDateTime = dateStr.substr(0, dateStr.length - 1) + '+0530';
    }
  }

  fetchBusinessDetails(businessId: string) {
    this.store.dispatch(
      CreateOfferActions.fetchBusinessDetails({ businessId })
    )
  }

  saveDefaultLocation() {
    this.allAddressSub$.subscribe(address => {
      if (address.length && !this.defaultAddressSaved) {
        address.forEach(addr => {
          if (!this.currentBusinessId) {
            if (addr.value?.default) {
              const defaultAddress = addr.value;
              this.defaultAddressSaved = true;
              this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
                key: 'location',
                value: defaultAddress,
                formGroupName: null
              }));
            }
          } else {
            if (addr.defaultAddress) {
              const defaultAddress = {
                ...addr,
                addressLine: addr.addressLine1,
                lat: addr.latitude,
                lng: addr.longitude
              };
              this.defaultAddressSaved = true;
              this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
                key: 'location',
                value: defaultAddress,
                formGroupName: null
              }));
            }
          }
        })
      }
    });
  }

  addBusinessFormControls() {
    if (!this.form.get("productType")) {
      this.form.addControl(
        "productType",
        this.fb.control(null, { validators: [Validators.required] })
      );
      this.form.addControl(
        "startDate",
        this.fb.control(null)
      );
      this.form.addControl(
        "endDate",
        this.fb.control(null)
      );
      this.form.addControl(
        "taxClass",
        this.fb.control(null, {
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        })
      );
      this.form.addControl(
        "sku",
        this.fb.control(null, {
          validators: [
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        })
      );
      this.form.addControl(
        "moq",
        this.fb.control(null, {
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        })
      );
      this.form.addControl(
        "hsnCode",
        this.fb.control(null, {
          validators: [
            Validators.required,
            Validators.min(1),
            Validators.max(99999999),
            Validators.minLength(4),
            Validators.maxLength(8),
            Validators.pattern(APP_CONFIGS.HAS_NUMBER_ONLY_2)
          ],
        })
      );
    }

    const dimensionFormGroup = this.fb.group({
      length: [null, {
        validators: [
          Validators.required,
          Validators.min(0.01),
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern(APP_CONFIGS.DIMENSION_PATTERN)
        ],
      }],
      breadth: [null, {
        validators: [
          Validators.required,
          Validators.min(0.01),
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern(APP_CONFIGS.DIMENSION_PATTERN)
        ],
      }],
      height: [null, {
        validators: [
          Validators.required,
          Validators.min(0.01),
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern(APP_CONFIGS.DIMENSION_PATTERN)
        ],
      }],
      weight: [null, {
        validators: [
          Validators.required,
          Validators.min(0.01),
          Validators.max(90),
          Validators.minLength(1),
          Validators.maxLength(6),
          Validators.pattern(APP_CONFIGS.DIMENSION_PATTERN)
        ],
      }],
      quantity: [1, {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern(APP_CONFIGS.HAS_NUMBER_ONLY_2)
        ]
      }]
    })

    this.form.removeControl("dimensions");
    this.form.addControl(
      "dimensions", this.fb.array([
        dimensionFormGroup
      ])
    );
  }

  patchValue(value, options = {}) {
    /****
     * SH - 25/08
     * added custom implementation
     * as angular cannot parse auctionInfo on patchValue
     * it also cannot parse dimension
     */
    Object.keys(value).forEach((name => {
      if (this.form.controls[name] && name !== 'auctionInfo' && name !== 'dimensions') {
        this.form.controls[name].patchValue(value[name], { onlySelf: true, emitEvent: false });
      }
    }));
    this.form.updateValueAndValidity(options);
  }

  auctionDateTimeChanged(event: MatDatepickerInputEvent<Date>) {
    const dateStr = new Date(event.value).toISOString();
    const endDate = dateStr.substr(0, dateStr.length - 1) + '+0530';
    this.auctionDateTime = endDate;

    this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
      key: 'endDate',
      value: endDate,
      formGroupName: 'auctionInfo'
    }));

    this.auctionDateDefaultValueSaved = true;
    // const offer = {
    //   offerType: this._offerType,
    //   offerId: this.offer?.draftOfferId,
    //   categoryId: this.offer?.category?.categoryId,
    //   quantity: this.offer.quantity ? this.offer.quantity : 1,
    //   auctionInfo: {
    //     ...this.offer?.auctionInfo,
    //     endDate
    //   }
    // }
    // this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }));
  }

  saveDraftOnFormControlChange(control: string) {
    this.form.get(control).valueChanges.subscribe(value => {
      let trimmedValue = value;
      if (control === 'description') {
        trimmedValue = value.trimStart();
      } else if (value && control !== 'negotiable' && control !== 'startDate' && control !== 'endDate') {
        trimmedValue = value.trim();
      }
      // removed validity check
      // if (value && this.form.get(control).valid) {
      this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
        key: control,
        value: trimmedValue,
        formGroupName: null
      }));
      // }
    });
  }


  checkStepPriceShouldNotGreaterThanBuyOutPrice() {
    this.minimumBidStepError = null;


    let isValidBuyOutPrice = this.form.get(`auctionInfo.buyOutPrice`).valid;
    let isValidStepPrice = this.form.get(`auctionInfo.stepPrice`).valid;

    if (isValidBuyOutPrice && isValidStepPrice) {

      console.log('stepPrice error');

      let errorMessage = "Minimum bid step should be less than Buyout value";
      let buyOutPrice = this.form.get(`auctionInfo.buyOutPrice`).value;
      let stepPrice = this.form.get(`auctionInfo.stepPrice`).value;

      if (buyOutPrice && stepPrice && +stepPrice >= +buyOutPrice) {
        // Show error
        this.minimumBidStepError = errorMessage;
        this.store.dispatch(CreateOfferActions.disableAccordionTwo());
        this.store.dispatch(CreateOfferActions.disablePostOfferSection());
      } else {
        this.minimumBidStepError = null;
        this.checkOfferAuctionInfoComplete();

      }

      // console.log('stepPrice buyOutPrice:', buyOutPrice, stepPrice, control);
    }

  }


  saveDraftOnFormControlChangeAuction(control: string) {
    this.form.get(`auctionInfo.${control}`).valueChanges.subscribe(value => {
      let trimmedValue = value;
      if (control !== 'endDate' && control !== 'end' && value) {
        trimmedValue = value.trim();
      }
      // removed validity check
      // if (value && this.form.get(`auctionInfo.${control}`).valid)
      this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
        key: control,
        value: trimmedValue,
        formGroupName: 'auctionInfo'
      }));
      // }
    });
  }

  saveDraftOnFormControlChangeDimension(control: string) {
    this.form.get(control).valueChanges.subscribe(value => {
      // let objFloat = {};
      // Object.keys(value[0]).forEach(x => {
      //   objFloat[x] = value[0][x] ? parseFloat(value[0][x]) : null;
      // });

      // NO NEED TO CHECK FOR VALIDATION
      // const controlValid = this.form.get('dimensions')['controls'][0].controls[control].valid;
      // if (objFloat) {
      this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
        key: control,
        value,
        formGroupName: null
      }));
      // }
    });
  }

  sendToStore(control: any, isAuction: boolean = false, isDimension: boolean = false) {
    if (isAuction) {
      let offer = {
        offerType: this._offerType,
        offerId: this.offer?.draftOfferId,
        categoryId: this.offer?.category?.categoryId,
        quantity: this.offer.quantity ? this.offer.quantity : 1,
        itemCondition: this.offer.itemCondition ? this.offer.itemCondition : OFFER_CONDITION.USED,
        unit: this.offer.unit ? this.offer.unit : OfferQuantityUnits.TYPE_PIECE,
        auctionInfo: {
          ...this.offer?.auctionInfo,
          [control]: this.form.get(`auctionInfo.${control}`).value,
        }
      }
      if (control === 'endDate' && offer.auctionInfo.endDate) {
        const dateStr = new Date(offer.auctionInfo.endDate).toISOString();
        const endDate = dateStr.substr(0, dateStr.length - 1) + '+0530';
        offer = {
          ...offer,
          auctionInfo: {
            ...this.offer?.auctionInfo,
            endDate
          }
        }
      }
      this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }));
    } else if (isDimension) {
      let offer = {
        offerType: this._offerType,
        offerId: this.offer?.draftOfferId,
        categoryId: this.offer?.category?.categoryId,
        quantity: this.offer.quantity ? this.offer.quantity : 1,
        itemCondition: this.offer.itemCondition ? this.offer.itemCondition : OFFER_CONDITION.USED,
        unit: this.offer.unit ? this.offer.unit : OfferQuantityUnits.TYPE_PIECE,
        businessOffer: true,
        dimensions: {
          ...this.offer?.dimensions,
          [control]: this.form.get(`dimensions.${control}`).value,
        }
      }
      this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }));
    } else {
      const offer = {
        offerType: this._offerType,
        offerId: this.offer?.draftOfferId,
        categoryId: this.offer?.category?.categoryId,
        quantity: this.offer.quantity ? this.offer.quantity : 1,
        itemCondition: this.offer.itemCondition ? this.offer.itemCondition : OFFER_CONDITION.USED,
        unit: this.offer.unit ? this.offer.unit : OfferQuantityUnits.TYPE_PIECE,
        dimensions: this.offer.dimensions ? this.offer.dimensions : null,
        [control]: this.form.get(control).value,
      }
      this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }));
    }
  }

  setExchangeType(value: any) {
    this.form.get('exchangeMode').setValue(value);
    this.form.removeControl("price");
    this.form.removeControl("negotiable");
    if (this.exchangeMoney) {
      this.form.addControl(
        "price",
        this.fb.control(0, {
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(10),
            Validators.min(1),
            Validators.pattern(APP_CONFIGS.HAS_DECIMAL)
          ]
        })
      );
      this.form.addControl(
        "negotiable",
        this.fb.control(false)
      );
      this.saveDraftOnFormControlChange('price');
      this.saveDraftOnFormControlChange('negotiable');
    } else if (this.exchangeFree) {
      // console.log('>>>>>>>> removed taxclass 2');
      this.showTaxClass = false;
      this.form.removeControl("taxClass");
    }
    this.form.get('exchangeMode').updateValueAndValidity();
  }

  setLocation(_event: any, address: any, isSingle: boolean = false) {
    const offer = {
      offerType: this._offerType,
      offerId: this.offer?.draftOfferId,
      categoryId: this.offer?.category?.categoryId,
      location: !this.currentBusinessId ? address.value : {
        ...address,
        addressLine: address.addressLine1,
        lat: address.latitude,
        lng: address.longitude,
      },
    }

    // LOCAL STORE UPDATE
    this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
      key: 'location',
      value: !this.currentBusinessId ? address.value : address,
      formGroupName: null
    }));

    if (isSingle) {
      this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }));
    } else {
      this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }));
    }
  }

  getIsChecked(address: any) {
    if (this.offer.location) {
      if (this.currentBusinessId) {
        const addressLine = this.offer.location.addressLine1 ? this.offer.location.addressLine1 : this.offer.location.addressLine;
        return address.addressLine1 === addressLine;
      }
      return this.offer.location?.addressLine === address.id;
    } else {
      // LOCAL STORE UPDATE
      if (!this.defaultAddressSaved) {
        // this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
        //   key: 'location',
        //   value: address.value,
        //   formGroupName: null
        // }));
        // this.defaultAddressSaved = true;
      }
      return this.currentBusinessId ? address?.defaultAddress : address.value?.default;
    }
  }

  setItemCondition(condition: string, index: number) {
    this.selected = index;
    this.form.get("itemCondition").setValue(condition);
    this.form.get("itemCondition").updateValueAndValidity();
  }

  openAddressModal() {
    // for business address we call a seperate API
    if (this.currentBusinessId) {
      this.openBusinessAddressPopup();
      return;
    }

    const dialogConfig = defaultDialogConfig();
    dialogConfig.id = 'create-offer-map-component';
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.data = {
      actionMode: 'add',
      address: '',
      offer: this.form.value
    };
    this.dialog.open(NewAddAddressComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => this.store.dispatch(
        CreateOfferActions.resetAddressModelOpenState({ closeOpenedModel: false })
      ));
  }

  get exchangeMoney(): boolean {
    if (!this.isAuction) {
      return this.form?.get('exchangeMode').value === AllDesireTypes.OFFER_DESIRE_MONEY;
    }
  }

  get exchangeFree(): boolean {
    if (!this.isAuction) {
      return this.form?.get('exchangeMode').value === AllDesireTypes.OFFER_DESIRE_FREE;
    }
  }

  get negotiable(): boolean {
    if (!this.isAuction) {
      return this.form?.get('negotiable')?.value;
    }
  }

  addDynamicFormControls(isauction: boolean) {
    if (!isauction) {
      this.form.addControl(
        "originCountry",
        this.fb.control('India', Validators.required)
      );
      this.form.addControl(
        "exchangeMode",
        this.fb.control(null, Validators.required)
      );
      this.form.removeControl("auctionInfo");
    } else {
      this.form.removeControl("originCountry");
      this.form.removeControl("exchangeMode");
      this.form.addControl(
        "auctionInfo",
        this.fb.group({
          basePrice: [0, {
            validators: [
              Validators.required,
              Validators.min(0.01),
              Validators.minLength(1),
              Validators.maxLength(10),
              Validators.pattern(APP_CONFIGS.HAS_DECIMAL)
            ],
            // updateOn: 'blur'
          }],
          buyOutPrice: [0, {
            validators: [
              Validators.min(0.01),
              Validators.minLength(1),
              Validators.maxLength(10),
              Validators.pattern(APP_CONFIGS.HAS_DECIMAL)
            ],
            // updateOn: 'blur'
          }],
          stepPrice: [0, {
            validators: [
              Validators.required,
              Validators.min(0.01),
              Validators.minLength(1),
              Validators.maxLength(10),
              Validators.pattern(APP_CONFIGS.HAS_DECIMAL)
            ],
            // updateOn: 'blur'
          }],
          endDate: [null, {
            validators: [
              Validators.required,
            ]
          }]
        })
      );
    }
  }

  updateCurrentActiveSection(control: string = '') {
    this.store.dispatch(CreateOfferActions.updateCurrentActiveSection({ name: 'itemProductDetails' }));
  }

  calculateProductDiscount(price: number = 0, discPrice: number = 0) {
    if (!price) {
      price = +this.offer.unitOfferValuation;
    }

    if (!discPrice) {
      discPrice = +this.offer.price;
    }

    if (price < discPrice) {
      this.discPriceError = 'Selling price cannot exceed product value';
    } else {
      this.discPriceError = null;
    }

    const disc = ((price - discPrice) / price * 100).toFixed(2);
    this.calculatedDiscount = `${disc}% discount on value`;
  }

  calculateAuctionError(basePrice?: string | number, buyOutPrice?: string | number) {
    if (!basePrice && !buyOutPrice) {
      return;
    }

    if (!basePrice) {
      basePrice = this.offer.auctionInfo?.basePrice;
    }

    if (!buyOutPrice) {
      // buyOutPrice = this.offer.auctionInfo?.buyOutPrice;
      this.auctionPriceError = null;
      return;
    }

    if (+basePrice >= +buyOutPrice) {
      this.auctionPriceError = 'Invalid buyout value';
      this.store.dispatch(CreateOfferActions.disableAccordionTwo());
      this.store.dispatch(CreateOfferActions.disablePostOfferSection());
    } else {
      this.auctionPriceError = null;
      this.checkOfferAuctionInfoComplete();
    }
  }

  calculateMoqError(quantity?: string | number, moq?: string | number) {
    if (!quantity && !moq) { return; }
    if (!quantity) { quantity = this.offer.quantity; }
    if (!moq) { moq = this.offer.moq; }

    if (+quantity < +moq) {
      this.moqError = 'Quantity has to be greater than minimum quantity';
      this.store.dispatch(CreateOfferActions.disableAccordionTwo());
      this.store.dispatch(CreateOfferActions.disablePostOfferSection());
    } else {
      this.moqError = null;
    }
  }

  checkOfferAuctionInfoComplete() {
    let currentOffer = this.offer;
    if (
      currentOffer.category
      && currentOffer.location
      && currentOffer.itemCondition
      && currentOffer.description
      && currentOffer.auctionInfo?.basePrice
      // && currentOffer.auctionInfo?.buyOutPrice
      && currentOffer.auctionInfo?.end && currentOffer.auctionInfo?.stepPrice
      && currentOffer.quantity && currentOffer.unit && currentOffer.unitOfferValuation
    ) {

      // CHECK IS STEP PRICE GREATER THAN BUYOUT PRICE
      if (currentOffer.auctionInfo.buyOutPrice
        && currentOffer.auctionInfo.stepPrice
        && +currentOffer.auctionInfo.stepPrice >= +currentOffer.auctionInfo.buyOutPrice) {
        this.store.dispatch(CreateOfferActions.enableAccordionOne());
        return
      }

      if (currentOffer.businessOffer) {
        if (!currentOffer.dimensions || !currentOffer.dimensions.length || !currentOffer.hsnCode) {
          this.store.dispatch(CreateOfferActions.enableAccordionOne());
          return
        }

        // NOW CHECK TAX CLASS
        if (!currentOffer.taxClass && currentOffer.exchangeMode !== AllDesireTypes.OFFER_DESIRE_FREE) {
          this.store.dispatch(CreateOfferActions.enableAccordionOne());
          return
        }

        // NOW CHECK THE DIMENSIONS ARRAY
        if (currentOffer.dimensions && currentOffer.dimensions.length) {
          if (
            currentOffer.dimensions[0]?.breadth
            && currentOffer.dimensions[0]?.height
            && currentOffer.dimensions[0]?.length
            && currentOffer.dimensions[0]?.weight
          ) { } else {
            this.store.dispatch(CreateOfferActions.enableAccordionOne());
            return;
          }
        }
      }

      this.store.dispatch(CreateOfferActions.enableAccordionTwo());
      if (currentOffer.facets && currentOffer.facets.length) {
        this.store.dispatch(CreateOfferActions.enablePostOfferSection());
      }
    }
  }

  openBusinessAddressPopup(
    titleValue: string = 'Corporate Office',
    modalTitle: string = 'Add business address'
  ) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'user-profile-map-component';
    dialogConfig.height = 'auto';
    dialogConfig.width = '720px';
    dialogConfig.data = {
      actionMode: 'add',
      address: '',
      modalTitle: modalTitle,
      nextButtonText: 'next',
      addressTitle: {
        name: 'Address Title',
        value: titleValue
      },
      addressAnnotations: [
        "Corporate office", "Registered office"
      ],
      allowOtherAddress: true,
      isBusiness: true,
      businessId: this.currentBusinessId
    };

    this.dialog.open(NewAddAddressComponent, dialogConfig)
      .afterClosed().subscribe(results => {
        // address is saved
        // set flag: closeOpenedModel to false
        this.store.dispatch(
          CreateOfferActions.resetAddressModelOpenState({ closeOpenedModel: false })
        );
        // this.fetchBusinessDetails(this.currentBusinessId);
      });
  }
}
