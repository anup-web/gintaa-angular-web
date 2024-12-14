import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { animate, style, transition, trigger } from '@angular/animations';

import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { DeafaultChatProfiletNoImage } from '@gintaa/shared/configs/default.config';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { StorageService } from '@gintaa/core/services/storage.service';
import {
  BusinessDetails,
  BUSINESS_COLOR_CODE_CLASSES,
  BUSINESS_COLOR_HEX,
  BUSINESS_COLOR_CLASS_TO_HEX,
  BUSINESS_COLOR_HEX_TO_CLASS
} from '@gintaa/modules/business/models/BusinessState.model';
import { AddressResponse } from '@gintaa/core/models';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { ImageComponent } from '@gintaa/shared/components/image/image.component';
import { AddNewAddressComponent } from '../add-new-address/add-new-address.component';
import {
  slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn,
  slideInRight, slideUpDownSmooth, slideInDownd, fadeInt, fadeAnimation
} from 'projects/gintaa/src/app/animation';
import { BusinessService } from '@gintaa/modules/business/services/business.service';
import { businessContactError } from '@gintaa/modules/business/configs/business-error.config';
import { ThemeService } from '@gintaa/core/theme/theme.service';


@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss'],
  animations: [
    slideInOut,  slideUpDown,
    flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight,
    slideUpDownSmooth, slideInDownd, fadeInt, fadeAnimation,
    trigger('fadeInDelayTrigger', [
      transition(':enter', [
        style({ opacity: 0, /* 'max-height': '0px' */ }),
        animate('1000ms', style({
          opacity: 1,
          // 'max-height': '500px'
        })),
      ])
    ]),
  ]
})
export class BusinessProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('fileBusinessCoverUpload', { static: false }) fileBusinessCoverUpload: ElementRef;
  @ViewChild('fileBusinessLogoUpload', { static: false }) fileBusinessLogoUpload: ElementRef;
  previewUrl: any = null;
  imageError: string = '';
  outIn: string = 'out';
  currentBusinessId: string;
  currentBusinessDetails: BusinessDetails;
  currentLyActiveColor: string = BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_BLUE;
  allBusinessColors = [
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_BLUE,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_PINK,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_GREEN,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_BISMARK,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_TUNDORA,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_LIGHT_BLUE,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_LOGAN,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_SALMON,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_MAROON,
    BUSINESS_COLOR_CODE_CLASSES.BUSINESS_COLOR_CYAN,
  ];
  actionMode:string;
  address: any;
  suggestedBusinessUrl = [];
  selectedBusinessUrl = "";

  breadcrumb: any = [{
    name: 'Business profile',
    show: true,
    click: false,
    // name: 'My profile',
    // link: '/profile',
  }];

  animationState: any = {
    contact_info: 'out',
    business_url: 'out',
    business_description: 'out',
    business_address: 'out',
    house_of_operation: 'out',
    cin_number: 'out',
    business_member: 'out'
  }

  businessForm: FormGroup;
  businessEditSection = {
    contact_info: false,
    business_url: false,
    business_description: false,
    business_address: false,
    house_of_operation: false,
    cin_number: false,
    business_member: false
  }

  submitted: boolean;
  cinNumberInvalid: boolean = false;
  businessDetailsNoImage = DeafaultChatProfiletNoImage.businessDetails;

  allDays           = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  allOperationsDay  = [
    {day: 'Su', activeStatus: false},
    {day: 'Mo', activeStatus: false},
    {day: 'Tu', activeStatus: false},
    {day: 'We', activeStatus: false},
    {day: 'Th', activeStatus: false},
    {day: 'Fr', activeStatus: false},
    {day: 'Sa', activeStatus: false},
  ];

  /** ROLE CHECKS */
  allowBusinessProfileEdit: boolean = true;
  allowBusinessProfileUpdateBanner: boolean = true;
  allowBusinessProfileUpdateLogo: boolean = true;
  allowBusinessProfileBrandColor: boolean = true;
  allowBusinessProfileContactInfo: boolean = true;
  allowBusinessProfileViewTeam: boolean = true;
  allowBusinessProfileAddAddress: boolean = true;
  allowBusinessProfileUpdateAddress: boolean = true;
  allowBusinessProfileDeleteAddress: boolean = true;
  allowBusinessProfileUpdateTimings: boolean = true;

  currentUserContactInfo: any = {
    mobile: '',
    phone: '',
    email: '',
  }

  businessContactError = businessContactError;

  addressList: any = [];

  constructor(
    public matDialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private location: Location,
    private sharedService: SharedService,
    private storageService: StorageService,
    private _changeDetectorRef: ChangeDetectorRef,
    private businessService: BusinessService,
    private _themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // fetch current business id
    this.currentBusinessId = this.route.snapshot.params.id;

    const selectedBusiness = this.storageService.getSelectedBusiness();
    if (selectedBusiness) {
      const { businessId, businessRole} = selectedBusiness;
      if (businessId === this.currentBusinessId) {
        this.allowBusinessProfileEdit = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_EDIT', businessRole);
        this.allowBusinessProfileUpdateBanner = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_UPDATE_BANNER', businessRole);
        this.allowBusinessProfileUpdateLogo = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_UPDATE_LOGO', businessRole);
        this.allowBusinessProfileBrandColor = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_UPDATE_BRAND_COLOR', businessRole);
        this.allowBusinessProfileContactInfo = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_UPDATE_CONTACT_INFO', businessRole);
        this.allowBusinessProfileViewTeam = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_VIEW_TEAM', businessRole);
        this.allowBusinessProfileAddAddress = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_ADD_ADDRESS', businessRole);
        this.allowBusinessProfileUpdateAddress = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_UPDATE_ADDRESS', businessRole);
        this.allowBusinessProfileDeleteAddress = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_DELETE_ADDRESS', businessRole);
        this.allowBusinessProfileUpdateTimings = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_UPDATE_TIMINGS', businessRole);

        this._changeDetectorRef.detectChanges();
      }
    }

    // bind the reactive form
    this.bindBusinessForm();
    this.fetchBusinessDetails(this.currentBusinessId);
    this.businessDetailsSubscriber();
  }

  ngAfterViewInit() {
    this._changeDetectorRef.detectChanges();
  }

  triggerSomething(event: any) {
    // console.log('transition is done for: ', event);
    if (event.fromState === 'in') {
      const selectedElement = event.element.classList[1]; // business-url-edit
      // REMOVE '-edit' FROM THIS THEN PROCEED
    }
  }

  fetchBusinessDetails(businessId: string) {
    this.store.dispatch(
      BusinessActions.fetchBusinessDetails({ businessId })
    )
  }

  getSuggestedUrl(businessName: string) {
    if(businessName) {
      this.store.dispatch(
        BusinessActions.fetchBusinessSuggestedUrl({ businessName: businessName })
      )
    }
  }

  businessDetailsSubscriber() {
    this.store.select(selectBusinessState).subscribe((business) => {
      this.currentBusinessDetails = { ...business.currentBusinessDetails };

      // console.log("====================================",this.currentBusinessDetails);
      if (this.currentBusinessDetails) {
        this.businessForm.patchValue({
          businessPhone: this.remove91ToPhoneNumber(this.currentBusinessDetails.phone),
          businessMobile: this.remove91ToPhoneNumber(this.currentBusinessDetails.mobile),
          businessEmail: this.currentBusinessDetails.email,
          businessUrl: this.currentBusinessDetails.profileUrl,
          businessDescription: this.currentBusinessDetails.description
          // timingInfoList: this.currentBusinessDetails.hoursOfOperations
        })
        this.selectedBusinessUrl = this.currentBusinessDetails.profileUrl;
        this.setActiveOperationsDays();
        this.suggestedBusinessUrl = business.currentBusinessSuggestedUrls;
      }

      // SET COLOR
      if (this.currentBusinessDetails.brandColour) {
        this.currentLyActiveColor = BUSINESS_COLOR_HEX_TO_CLASS[this.currentBusinessDetails.brandColour];
      }

      this._changeDetectorRef.detectChanges();
    })

    
  }

  setActiveOperationsDays() {
    this.resetAllOperationsDay();
    if(this.currentBusinessDetails.hoursOfOperations) {        
      this.currentBusinessDetails.hoursOfOperations.map(item=>{
        const day = item.day;
        const indxOf = this.allDays.indexOf(day);
        if(indxOf !== -1) {
          this.allOperationsDay[indxOf].activeStatus = true;
        }
        // console.log('indxOf:', indxOf, day);
      })
    }
  }

  resetAllOperationsDay() {
    this.allOperationsDay  = [
      {day: 'Su', activeStatus: false},
      {day: 'Mo', activeStatus: false},
      {day: 'Tu', activeStatus: false},
      {day: 'We', activeStatus: false},
      {day: 'Th', activeStatus: false},
      {day: 'Fr', activeStatus: false},
      {day: 'Sa', activeStatus: false},
    ];
  }

  showLoader() {
    this.store.dispatch(BusinessActions.pageLoading());
  }

  hideLoader() {
    this.store.dispatch(BusinessActions.pageLoaded());
  }

  setActiveColor(colorCode: string) {
    console.log("colorcode",colorCode)
    if (colorCode) {
      this.currentLyActiveColor = colorCode;
      const color = BUSINESS_COLOR_CLASS_TO_HEX[colorCode];
      console.log("color",color)
      this._themeService.SendcolorHexcode(color);

      this.store.dispatch(BusinessActions.updateBusinessColor({
        businessId: this.currentBusinessId,
        color
      }))
    }
  }

  openUploadCoverImageDialog() {
    const fileBusinessCoverUpload = this.fileBusinessCoverUpload.nativeElement;
    fileBusinessCoverUpload.onchange = ($event) => {
      var mimeType = fileBusinessCoverUpload.files[0]?.type;
      if (mimeType.match(/image\/*/) == null) {
        this.imageError = "Invalid image!";
        return;
      }
      this.imageError = '';
      this.openImageCropModal('cover', fileBusinessCoverUpload.files, $event);
    };
    fileBusinessCoverUpload.click();
  }

  openImageCropModal(oeration: string, files: any, $event: any) {
    let imageAspectRatioX = 1;
    if (oeration === 'cover') {
      imageAspectRatioX = 4;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'business-cover-image-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '800px';
    dialogConfig.data = { files, event: $event, imageAspectRatioX };

    const modalDialog = this.matDialog.open(ImageComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(results => {
      // if(this.fileBusinessCoverUpload.nativeElement){
      //   this.fileBusinessCoverUpload.nativeElement.value = '';
      // }
      
      if(this.fileBusinessLogoUpload.nativeElement) {        
        this.fileBusinessLogoUpload.nativeElement.value = '';
      }

      if (results.files) {
        results.files.forEach( file => {
          this.uploadProfilePic(file, oeration);
        });
      }
    });
  }

  private uploadProfilePic(file: any, oeration: string = 'cover') {
    this.showLoader();
    const formData = new FormData();
    formData.append('file', file);

    if (oeration === 'cover') {
      this.store.dispatch(
        BusinessActions.uploadBusinessCoverImage({
          formData,
          businessId: this.currentBusinessId
        })
      );
    } else {
      this.store.dispatch(
        BusinessActions.uploadBusinessLogo({
          formData,
          businessId: this.currentBusinessId
        })
      );
    }

  }

  openUploadBusinessLogoDialog() {
    const fileBusinessLogoUpload = this.fileBusinessLogoUpload.nativeElement;
    fileBusinessLogoUpload.onchange = ($event) => {
      var mimeType = fileBusinessLogoUpload.files[0]?.type;
      if (mimeType.match(/image\/*/) == null) {
        this.imageError = "Invalid image!";
        return;
      }
      this.imageError = '';
      this.openImageCropModal('logo', fileBusinessLogoUpload.files, $event);
    };
    fileBusinessLogoUpload.click();
  }

  removeBusinessLogo() {
    this.showLoader();
    this.currentBusinessDetails.logoUrl = null;
    this.store.dispatch(BusinessActions.deleteBusinessLogo({
      businessId: this.currentBusinessId
    }))

   // console.log("=======================================")
    const selectedBusinessId = this.storageService.getSelectedBusiness() ? this.storageService.getSelectedBusiness().businessId : null;

    this.storageService.getBusinessId(selectedBusinessId);
    this.fetchSelectedBusinessLogo();
  }

  fetchSelectedBusinessLogo() {
    const selectedBusinessId = this.storageService.getSelectedBusiness() ? this.storageService.getSelectedBusiness().businessId : null;

    console.log("selectedBusinessId",selectedBusinessId);
    // if (this.selectedBusinessProfile?.logo) {
    //   return this.selectedBusinessProfile.logo;
    // } else {
    //   const selectedBusinessId = this.storageService.getSelectedBusiness() ? this.storageService.getSelectedBusiness().businessId : null;
    //   if (selectedBusinessId) {
    //     const currentBusiness = this.businessProfiles.filter(business => business.businessId === selectedBusinessId);
    //     this.setSelectedBusinessProfile(selectedBusinessId);
    //     return currentBusiness[0]?.logoUrl;
    //   }
    //   return null;
    // }
  }

  avatarImageInitials() {
    return this.currentBusinessDetails.name;
  }

  openBusinessAddressPopup(address: any = '', mode: string = 'add', titleValue: string = '', modalTitle: string = 'Add business address') {

    if (mode === 'edit') {
      // update the current address in store
      this.store.dispatch(
        BusinessActions.updateBusinessAddress({ address  })
      );

      this.actionMode = 'edit';
      this.address = address ;
    } else {
      this.actionMode = 'add';
      this.address = '';
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'user-profile-map-component';
    dialogConfig.height = 'auto';
    dialogConfig.width = '720px';
    dialogConfig.data = {
      actionMode: this.actionMode,
      address: this.address,
      modalTitle: modalTitle,
      nextButtonText: 'next',
      addressTitle: {
        name: 'Address Title',
        value: titleValue
      },
      addressAnnotations: [
        "Corporate office", "Registered office"
      ],
      allowOtherAddress: true
    };
    this._changeDetectorRef.detectChanges();
    const modalDialog = this.matDialog.open(AddNewAddressComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(results => {
      // address is saved
      // set flag: closeOpenedModel to false
      this.store.dispatch(BusinessActions.resetModalFlag());
      this.fetchBusinessDetails(this.currentBusinessId);
      
    });
  }

  bindBusinessForm() {
    this.businessForm = new FormGroup({
      businessPhone: new FormControl('', [
        // Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14),
        Validators.pattern(APP_CONFIGS.VALID_PHONE_REGEX)
      ]),
      businessMobile: new FormControl('', [
        // Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14),
        Validators.pattern(APP_CONFIGS.VALID_PHONE_REGEX)
      ]),
      businessEmail: new FormControl('', [
        // Validators.required,
        Validators.minLength(4),
        Validators.email,
        Validators.maxLength(100),
        Validators.pattern(APP_CONFIGS.VALID_EMAIL_REGEX)
      ]),
      businessUrl: new FormControl('', [
        // Validators.required,
        Validators.minLength(4),
      ]),
      businessDescription: new FormControl('', []),
      serviceTimingInfos: this.fb.array([]),
      timingInformationList: this.fb.array([]),
      serviceTimeSameForAllDays: new FormControl(false)
    });
  }

  // reactive form getters
  get businessPhone() { return this.businessForm.get('businessPhone'); }
  get businessMobile() { return this.businessForm.get('businessMobile'); }
  get businessEmail() { return this.businessForm.get('businessEmail'); }
  get businessUrl() { return this.businessForm.get('businessUrl'); }
  get businessDescription() { return this.businessForm.get('businessDescription'); }

  toggleBusinessEditSection(from: string, show: boolean = true) {
    this.outIn = "in";
    if (from) {
      this.businessEditSection[from] = show;
      this.toggleShowDiv(from);
    }


    if(from && show && from === 'business_url') {
      let busiinessName = this.currentBusinessDetails.name;
      this.getSuggestedUrl(busiinessName);
    }

    if(from && show && from === 'contact_info') {
      this.getCurrentUserInfo();
      this.businessDetailsSubscriber();
    }

  }

  getCurrentUserInfo() {
    let userContactInfo: any = this.businessService.getCurrentUserContactInfo();
    // console.log('userContactInfo:', userContactInfo);
    if(userContactInfo) {
      this.currentUserContactInfo.phone   = userContactInfo.phone_number;
      this.currentUserContactInfo.mobile  = userContactInfo.phone_number;
      this.currentUserContactInfo.email   = userContactInfo.email;
    }
  }

  returnBusinessFormValueByType(from: string) {
    let returnFormData: any = {};
    switch(from) { 
      case 'contact_info': {
        returnFormData = {
          email   : this.businessForm.value.businessEmail,
          mobile  : this.add91ToPhoneNumber(this.businessForm.value.businessMobile),
          phone   : this.add91ToPhoneNumber(this.businessForm.value.businessPhone)
        }
         break; 
      } 
      case 'business_url': { 
        returnFormData = {
          profileUrl  : this.businessForm.value.businessUrl
        }
         break; 
      } 
      case 'business_description': { 
        returnFormData = {
          description  : this.businessForm.value.businessDescription
        }
         break;       
      } 
      default: { 
        returnFormData = {}
         break; 
      } 
   }

   return returnFormData;
  }

  updateBusinessDetails(from: string) {
    if (this.businessForm.valid) {

      this.store.dispatch(
        BusinessActions.updateBusinessDetails({
          businessForm  : this.returnBusinessFormValueByType(from), //this.businessForm.value
          businessId    : this.currentBusinessId
        })
      )

    }
    
    // console.log('businessForm:', this.businessForm.value)

    // update values locally
    this.currentBusinessDetails = {
      ...this.currentBusinessDetails,
        phone: this.add91ToPhoneNumber(this.businessForm.value.businessPhone),
        mobile: this.add91ToPhoneNumber(this.businessForm.value.businessMobile),
        email: this.businessForm.value.businessEmail,
        profileUrl: this.businessForm.value.businessUrl,
        description: this.businessForm.value.businessDescription
    }
    this.toggleBusinessEditSection(from, false);
  }

  updateSelectedBusinessUrl(url: string) {
    
    this.selectedBusinessUrl = url;
    this.businessForm.patchValue({
      ...this.businessForm.value,
      businessUrl: url
    });


  }

  removeBusinessAddress(curAddress: AddressResponse, index: number) {
    // remove locally
    const address = [ ...this.currentBusinessDetails.businessAddresses ];
    address.splice(index, 1);
    
    // update the store
    this.store.dispatch(
      BusinessActions.removeBusinessAddress({ addressId: curAddress.id, businessId: this.currentBusinessId})
    )
  }

  updateBusinessHOP() {
    this.submitted = true;
    // console.log(this.businessForm.value);

    this.updateServiceTiming();


    let serviceTiming = this.businessForm.value.serviceTimingInfos.map(obj => ({
      ...obj,
      timingInfoList: obj.timingInfoList.map(o => ({
        ...o,
        startTime: this.formatServiceTime(o.startTime),
        endTime: this.formatServiceTime(o.endTime)
      }))
    }))

    // console.log('serviceTiming:', serviceTiming);
    
    const hrsOfOpSameAllDays = this.businessForm.value.serviceTimeSameForAllDays;

    if (serviceTiming && serviceTiming.length > 0 ) {
      let businesssFormData = {
        hoursOfOperation  : serviceTiming,
        hrsOfOpSameAllDays: hrsOfOpSameAllDays
      }
      
      this.store.dispatch(
        BusinessActions.updateBusinessDetails({
          businessForm  : businesssFormData,
          businessId    : this.currentBusinessId
        })
      )

    }

    setTimeout(()=>{
      this.toggleBusinessEditSection('house_of_operation', false);
    }, 1000)
    // this.toggleBusinessEditSection('house_of_operation', false);
  }

  updateCINNumber(event: any) {
    // console.log(event.target.value);
    this.toggleBusinessEditSection('cin_number', false);
  }


  toggleShowDiv(divName: string) {
    if (divName) {
      // console.log(this.animationState);
      this.animationState[divName] = this.animationState[divName] === 'out' ? 'in' : 'out';
      // console.log(this.animationState);
    }
  }


  backToPreviousPage() {
    this.location.back()
  }

  remove91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if(phone && phone.includes(replaceString)) {
      phone = phone.replace(replaceString, '')
    }
    return phone;
  }

  add91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if(phone && !phone.includes(replaceString)) {
      phone = replaceString+phone;
    }
    return phone;
  }

  updateServiceTiming() {
    const serviceAvailbility = this.businessForm.get("serviceTimeSameForAllDays").value;
    if(!serviceAvailbility) {
      let serviceTimingArray: any[] = this.businessForm.get('serviceTimingInfos').value;      
      let timingInfos = serviceTimingArray[0].timingInfoList;
      serviceTimingArray = serviceTimingArray.map(obj => ({ ...obj, timingInfoList: timingInfos })) 
      this.businessForm.get('serviceTimingInfos').patchValue(serviceTimingArray);
      this.businessForm.get('serviceTimingInfos').updateValueAndValidity();
      // console.log('Array:::', serviceTimingArray);
    }
  }

  formateHoursOfOperation() {
    let serviceTimingInfos: any = (this.businessForm.value.serviceTimingInfos) ? this.businessForm.value.serviceTimingInfos : null;
    let returnObject: any = {};
    // console.log('serviceTimingInfos:', serviceTimingInfos);

    // if(serviceTimingInfos && serviceTimingInfos.length > 0) {
    //   returnObject = serviceTimingInfos.map(item => {
    //     let scheduleHours: any = {};
    //     scheduleHours[item.dayOfWeek] = [];
    //     let timingInfoList = item.timingInfoList;
    //     scheduleHours[item.dayOfWeek] = timingInfoList.map( timeList => {
    //       timeList.startTime  = timeList.startTime.getHours() + ':' + timeList.startTime.getMinutes();
    //       timeList.endTime    = timeList.endTime.getHours() + ':' + timeList.endTime.getMinutes();

    //       return timeList;
    //     })

    //     return scheduleHours;
        
    //   });

    //   console.log('scheduleHours:', returnObject);
    // }

  }

  public formatServiceTime(time): string {
    const formatTime = new Date(time);
    const hours = formatTime.getHours() < 10 ? '0' + formatTime.getHours() : formatTime.getHours();
    const minutes = formatTime.getMinutes() < 10 ? '0' + formatTime.getMinutes() : formatTime.getMinutes();
    const seconds = formatTime.getSeconds() < 10 ? '0' + formatTime.getSeconds() : formatTime.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  setAsDefaultAddress(address) {
    // this.currentBusinessId
    // let addresss = {defaultAddress: true};
    let updateAddress = JSON.parse(JSON.stringify(address));
    // console.log('addresss:', address);
    updateAddress.defaultAddress = true;

    let currentAddressId = updateAddress.id;
      this.store.dispatch(
        BusinessActions.editAddress({ address: updateAddress, addressId: currentAddressId, businessId: this.currentBusinessId })
      );

  }

  useCustomerInfo(infoType: string = '') {
    switch(infoType) {
      case 'PHONE':
        let phone = this.remove91ToPhoneNumber(this.currentUserContactInfo.phone);
        this.businessForm.get('businessPhone').patchValue(phone);
        this.businessForm.get('businessPhone').updateValueAndValidity();
        break

      case 'MOBILE':
        let mobile = this.remove91ToPhoneNumber(this.currentUserContactInfo.mobile);
        this.businessForm.get('businessMobile').patchValue(mobile);
        this.businessForm.get('businessMobile').updateValueAndValidity();
        break

      case 'EMAIL':
        let email = this.remove91ToPhoneNumber(this.currentUserContactInfo.email);
        this.businessForm.get('businessEmail').patchValue(email);
        this.businessForm.get('businessEmail').updateValueAndValidity();
        break

      default:        
        // console.log('default:', infoType);
    }
  }

  getBusinessURLPrefix() {
    let currentDomain = "www.gintaa.com"
    if (isPlatformBrowser(this.platformId)) {
      currentDomain = window.location.origin
    }
    let businessUrlPrefix = currentDomain + '/business/'
    return businessUrlPrefix;
  }

  getBusinessCompleteUrl(businessSlug: string) {

  }

  CheckLengthOFAddress(businessAddress:any){
  if(businessAddress?.length > 1){
    return true;
  }else{
    return false;
  }
  }

}
