import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectOfferBulkUploadState } from '../../store/offer-bulk-upload.selector';
import { OfferBulkUploadActions } from '../../store/action-types';
import { NavigationExtras, Router } from '@angular/router';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-business-bulk-items',
  templateUrl: './business-bulk-items.component.html',
  styleUrls: ['./business-bulk-items.component.scss']
})
export class BusinessBulkItemsComponent implements OnInit {

  @ViewChild('form', { static: false }) form;
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  downloadFileName: string = 'Offer-Bulk-Upload-Format.xlsx';
  contentUploadedSuccess: boolean = false;
  fileTypeError: string = '';
  uploadedFiles: any[] = [];
  processedOffers: any[] = [];
  successMessage: string = null;
  pageLoading: boolean = false;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
    
    this.store.dispatch(UtilityActions.pageLoaded());

    this.store.select(selectOfferBulkUploadState).subscribe(offerBulkUploadState => {
      this.processedOffers = offerBulkUploadState.offers;
      this.successMessage = offerBulkUploadState.successMessage;

      if (this.processedOffers.length > 0) {
        this.contentUploadedSuccess = true;
        this.store.dispatch(UtilityActions.pageLoaded());
      }
    })

    this.store.select(selectUtilityState).subscribe(utililyState => {
      this.pageLoading = utililyState.loading;
    })
  }

  downloadTemplate() { }

  uploadFile() {
    /******
     * XLS MIME TYPES
     * application/excel
     * application/vnd.ms-excel
     * application/x-excel
     * application/x-msexcel
     * application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
     */

    this.uploadedFiles = [];

    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = ($event) => {
      var mimeType = fileUpload.files[0]?.type;
      // console.log('MIME Types:', mimeType);
      if (mimeType.match(/spreadsheetml\/*/) == null && mimeType.match(/ms-excel/) === null) {
        this.fileTypeError = "Invalid file format!";
        return;
      }
      this.fileTypeError = '';
      this.beginUpload(fileUpload.files, $event);
    };
    fileUpload.click();
  }

  beginUpload(files: any, $event: any) {
    // console.log('FILES', files, files.length);
    this.store.dispatch(UtilityActions.pageLoading());

    if (files && files.length) {
      Array.from(files).forEach((element: any) => {
        this.uploadedFiles.push({
          name: element.name,
          size: element.size,
          type: element.type
        })
      });

      this.store.dispatch(OfferBulkUploadActions.bulkUploadOffer({ offers: [] }))
    }

  }

  clearUploadedPopup(index: number = 0) {
    this.uploadedFiles.splice(index, 1);
    // TODO
    // also call the remove all draft offers API
    this.store.dispatch(
      OfferBulkUploadActions.clearUploadedOffers()
    );
    
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
  }

  removeSelectedOffer(offerId: string) {
    if (offerId) {
      this.store.dispatch(OfferBulkUploadActions.removeOfferByOfferId({ offerId }))
      // TODO: also call the remove the selected draft offer
      // this.createOfferService.removeDraftOfferById(this.draftOfferId)
    }
  }

  redirectToDraft(offerId: string) {
    // alert(offerId);
    if (offerId) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          'id': '1620626340869',
          'from': 'bulk-upload',
        },
      };
      
      this.router.navigate(['/listing/item'], navigationExtras);
    }
  }

  publishOffers() {
    if (this.processedOffers.length > 0) {
      this.store.dispatch(
        OfferBulkUploadActions.publishOffers({
          offers: this.processedOffers
        })
      )
    }
  }

}
