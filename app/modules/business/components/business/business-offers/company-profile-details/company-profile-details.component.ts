import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { StorageService } from '@gintaa/core/services/storage.service';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { BusinessDetails, BUSINESS_COLOR_CODE_CLASSES, BUSINESS_COLOR_HEX_TO_CLASS } from '@gintaa/modules/business/models/BusinessState.model';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from '@gintaa/core/theme/theme.service';
import { Store } from '@ngrx/store';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
@Component({
  selector: 'app-company-profile-details',
  templateUrl: './company-profile-details.component.html',
  styleUrls: ['./company-profile-details.component.scss']
})
export class CompanyProfileDetailsComponent implements OnInit {

  @Input() business: BusinessDetails;
  @Input() totalOfferCount: number;
  colorSubscriber: Subscription;
  currentBusinessDetails: BusinessDetails;
  currentLyActiveColor: string;

  allowEditBusiness: boolean = false;
  allDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  allOperationsDay = [
    { day: 'Su', activeStatus: false },
    { day: 'Mo', activeStatus: false },
    { day: 'Tu', activeStatus: false },
    { day: 'We', activeStatus: false },
    { day: 'Th', activeStatus: false },
    { day: 'Fr', activeStatus: false },
    { day: 'Sa', activeStatus: false },
  ];


  businessNoImageHeader: string = 'assets/images/business/company-logo.svg';
  defaultBusinessAddress: any[] = [];
  constructor(
    private _themeService: ThemeService,
    private storageService: StorageService,
    private sharedService: SharedService,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {

    // this.colorSubscriber = this._themeService.getColorHexCode().subscribe(colorHexcode => {
    //   console.log("ccode",colorHexcode)
    //   if (colorHexcode) {
    //     this.currentLyActiveColor = colorHexcode.cCode;
    //     console.log("=================colorCode",colorHexcode.cCode);
    //     // this.getCurrentBusinessDetails(colorCode.currentBusinessId);
    //   } else {
    //   }
    // });

    //console.log("this.currentLyActiveColor",this.currentLyActiveColor)

    const selectedBusiness = this.storageService.getSelectedBusiness();
    //console.log("==============================",selectedBusiness);
    if (selectedBusiness) {
      const { businessId, businessRole } = selectedBusiness;
      this.allowEditBusiness = this.sharedService.allowBusinessAction('BUSINESS_OVERVIEW_EDIT', businessRole);
    }
    this.setActiveOperationsDays();
    this.getDefaultAddress();
  }

  setActiveOperationsDays() {
    this.resetAllOperationsDay();
    setTimeout(() => {
      if (this.business && this.business.hoursOfOperations) {
        this.business.hoursOfOperations.map(item => {
          const day = item.day;
          const indxOf = this.allDays.indexOf(day);
          if (indxOf !== -1) {
            this.allOperationsDay[indxOf].activeStatus = true;
          }
        })
      }
    }, 1000);
  }

  resetAllOperationsDay() {
    this.allOperationsDay = [
      { day: 'Su', activeStatus: false },
      { day: 'Mo', activeStatus: false },
      { day: 'Tu', activeStatus: false },
      { day: 'We', activeStatus: false },
      { day: 'Th', activeStatus: false },
      { day: 'Fr', activeStatus: false },
      { day: 'Sa', activeStatus: false },
    ];
  }


  getBusinessURLPrefix() {
    let currentDomain = "www.gintaa.com"
    if (isPlatformBrowser(this.platformId)) {
      currentDomain = window.location.origin
    }
    let businessUrlPrefix = currentDomain + '/business/'
    return businessUrlPrefix;
  }

  getBusinessUrlBySlug(businessSlug: string) {
    return this.getBusinessURLPrefix() + businessSlug;
  }

  getDefaultAddress() {
    // this.defaultBusinessAddress
    setTimeout(() => {
      this.defaultBusinessAddress = this.business.businessAddresses.filter((address) => address.defaultAddress);
      console.log('defaultBusinessAddress:', this.defaultBusinessAddress, this.business.businessAddresses);
    }, 1000);
  }

  getColorCode() {
    this.store.select(selectBusinessState).subscribe((business) => {
      this.currentBusinessDetails = { ...business.currentBusinessDetails };
      if (this.currentBusinessDetails.brandColour) {
        this.currentLyActiveColor = this.currentBusinessDetails.brandColour
        return this.currentBusinessDetails.brandColour;
      } else {
        return '#48CEF3'
      }

    })
  }
}
