import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { OfferAddress } from '@gintaa/core/models';
import { serviceOfferError } from '@gintaa/modules/create-offer/configs/create-offer-error.config';
import { AllDesireTypes, CREATE_OFFER_TITLE, CREATE_OFFER_TYPE, OfferExchangeTypes, serviceDuration } from '@gintaa/modules/create-offer/configs/create-offer.config';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { allAddressSelector, allBusinessAddressSelector, selectOfferInfo } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewAddAddressComponent } from '../add-address-popup/add-address/add-address.component';
import { StorageService } from '@gintaa/core/services/storage.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-service-offer-info',
  templateUrl: './service-offer-info.component.html',
  styleUrls: ['./service-offer-info.component.scss']
})
export class ServiceOfferInfoComponent implements OnInit {

  private _offerType: string = CREATE_OFFER_TYPE.SERVICE;
  offer: Offer;
  public form: FormGroup;
  exchangeTypeArr = OfferExchangeTypes;
  allAddressSub$: Observable<OfferAddress[]>;
  allOfferAddress: OfferAddress[];
  serviceDurationOptions = serviceDuration;
  isMyLocation: any = null;
  isCustomerLocation: boolean;
  offerTitleHelp: string = null;
  isOnline: boolean;
  categoryId: string = null;
  offerErrors = serviceOfferError;
  defaultAddressSaved: boolean = false;
  currentBusinessId: string;
  hsnCodeError: string = null;

  constructor(
    private _route: ActivatedRoute,
    private store: Store<gintaaApp.AppState>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private storageService: StorageService,
  ) {
    this._offerType = this._route.snapshot.data['offerType'];
    this.createForm();
    this.offerTitleHelp = CREATE_OFFER_TITLE.SERVICE_TITLE_HELP;
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
      exchangeMode: [null, { validators: Validators.required }],
      rate: [null, {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(7),
          Validators.pattern(APP_CONFIGS.HAS_DECIMAL)
        ],
      }],
      duration: null
    });
  }

  ngOnInit(): void {
    this.allAddressSub$ = this.store.pipe(select(allAddressSelector));

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
      this.offer = currentOffer;
      this._offerType = currentOffer.offerType;
      this.categoryId = currentOffer.category && currentOffer.category.categoryId;

      if (currentOffer.draftOfferId) {
        // FORCE UPDATE LOCATION
        if (!currentOffer.location && !this.defaultAddressSaved) {
          this.saveDefaultLocation();
        }

        if (currentOffer.exchangeMode === AllDesireTypes.OFFER_DESIRE_MONEY) {
          this.form.addControl(
            "price",
            this.fb.control(0, {
              validators: [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(10),
                Validators.pattern(APP_CONFIGS.HAS_DECIMAL)
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
          // this.showTaxClass = false;
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

        if (!currentOffer.exchangeMode) {
          this.setExchangeType(AllDesireTypes.OFFER_DESIRE_MONEY);
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

        this.form.patchValue({
          description: this.offer.description,
          exchangeMode: this.offer.exchangeMode,
          rate: this.offer.rate,
          duration: this.offer.duration,
          price: this.offer.rate,
          negotiable: this.offer.negotiable,
          location: this.offer.location,
          hsnCode: this.offer.hsnCode,
          taxClass: this.offer.taxClass
        }, { emitEvent: false });
        this.isMyLocation = this.offer.myLocation;
        this.isCustomerLocation = this.offer.yourLocation;
        this.isOnline = this.offer.remote;
      }
    });

    Object.keys(this.form.controls).forEach(control => {
      this.saveDraftOnFormControlChange(control);
    });
  }

  addBusinessFormControls() {
    if (!this.form.get("taxClass")) {
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

    if (!this.form.get("hsnCode")) {
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
  }

  saveDraftOnFormControlChange(control: string) {
    this.form.get(control).valueChanges.subscribe(value => {
      let trimmedValue = value;
      if (control === 'description') {
        trimmedValue = value.trimStart();
      } else if (control !== 'negotiable') {
        trimmedValue = value.trim();
      }
      // removed validity check
      // && value && this.form.get(control).valid
      if (control !== 'negotiable') {
        this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
          key: control,
          value: trimmedValue,
          formGroupName: null
        }));
      } else if (control === 'negotiable') {
        this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
          key: control,
          value: trimmedValue,
          formGroupName: null
        }));
      }
    });
  }

  sendToStore(control: any) {
    const offer = {
      offerType: this._offerType,
      offerId: this.offer?.draftOfferId,
      categoryId: this.categoryId,
      [control]: this.form.get(control).value,
    }
    this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }))
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
          ],
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
      // this.showTaxClass = false;
      this.form.removeControl("taxClass");
    }
    this.form.get('exchangeMode').updateValueAndValidity();
  }

  setLocation(_event: any, address: any) {
    const offer = {
      offerType: this._offerType,
      offerId: this.offer?.draftOfferId,
      categoryId: this.categoryId,
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

    this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }));
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
      return this.currentBusinessId ? address?.defaultAddress : address.value?.default;
    }
  }

  setMyLocation() {
    this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
      key: 'myLocation',
      value: this.isMyLocation,
      formGroupName: null
    }));
  }

  setOnline() {
    this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
      key: 'remote',
      value: this.isOnline,
      formGroupName: null
    }));
  }

  setYourLocation() {
    this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdate({
      key: 'yourLocation',
      value: this.isCustomerLocation,
      formGroupName: null
    }));
  }

  get isService(): boolean {
    return this._offerType === CREATE_OFFER_TYPE.SERVICE;
  }

  get offerTitle(): string {
    const title = CREATE_OFFER_TITLE.SERVICE_TITLE;
    return title;
  }

  openAddressModal() {
    // for business address we call a seperate API
    if (this.currentBusinessId) {
      this.openBusinessAddressPopup();
      return;
    }

    const dialogConfig = defaultDialogConfig();
    dialogConfig.id = 'create-offer-map-component';
    dialogConfig.position = { top: '10px' };
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

  get exchangeMoney(): boolean {
    return this.form?.get('exchangeMode').value === AllDesireTypes.OFFER_DESIRE_MONEY;
  }

  get exchangeFree(): boolean {
    return this.form?.get('exchangeMode').value === AllDesireTypes.OFFER_DESIRE_FREE;
  }

  get negotiable(): boolean {
    return this.form?.get('negotiable')?.value;
  }
}
