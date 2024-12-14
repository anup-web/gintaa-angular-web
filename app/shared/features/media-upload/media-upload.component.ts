import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { APP_CONSTANTS } from '@gintaa/config/constant.config';
import { CREATE_OFFER_IMAGE_TYPE, CREATE_OFFER_TYPE } from '@gintaa/modules/create-offer/configs/create-offer.config';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import {
  selectMediaUploadLoader,
  selectOfferError, selectOfferInfo,
  selectOfferMedias,
  selectOfferState
} from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { ImageComponent } from '@gintaa/shared/components/image/image.component';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { MediaTypes, UploadResponse } from '@gintaa/shared/models/media';
import { Offer } from '@gintaa/shared/models/offer';
import { CompressImageService } from '@gintaa/shared/services/compress-image.service';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { noop, Observable, Subject, Subscription } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { SharedService } from '@gintaa/shared/services/shared.service';
import localization from '@gintaa/config/localization';
@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss']
})
export class MediaUploadComponent implements OnInit, OnDestroy {

  files: File[] = [];
  imageFiles: File[] = [];
  videoFiles: File[] = [];
  totalMediaLength: number = APP_CONSTANTS.MEDIA_LIMIT;
  acceptedMediaType: string = APP_CONSTANTS.MEDIA_TYPE.join(',');
  mediaLength: number = 0;
  private destroy$ = new Subject<void>();

  // file ref variables
  @ViewChild('coverFileInput', { static: false }) coverFileInput: ElementRef;
  @ViewChild('frontFileInput', { static: false }) frontFileInput: ElementRef;
  @ViewChild('backFileInput', { static: false }) backFileInput: ElementRef;
  @ViewChild('leftFileInput', { static: false }) leftFileInput: ElementRef;
  @ViewChild('rightFileInput', { static: false }) rightFileInput: ElementRef;
  @ViewChild('fileInput', { static: false }) myFileInput: ElementRef;

  mediaSub$: Subscription;
  coverMediaSub: UploadResponse = null;
  frontMediaSub: UploadResponse = null;
  backMediaSub: UploadResponse = null;
  leftSideMediaSub: UploadResponse = null;
  rightSideMediaSub: UploadResponse = null;
  moreMediaSub: UploadResponse[] = [];
  mediaSubError$: Observable<string>;
  OfferId: string = null;
  draftId: string = null;
  offer: Offer;
  offerCategory: string = 'DRAFT';
  isMediaLimitExceed: boolean;
  isVideoLimitExceed: boolean;
  videoMediaLength: number = 0;
  imageMediaLength: number = 0;
  currentOfferImages: UploadResponse[] = [];
  private _offerType: string = CREATE_OFFER_TYPE.ITEM;
  mediaUploadLoader: boolean = false;
  imageUploadFailed: boolean = false;
  imageDeleteFailed: boolean = false;
  errorMessage: any = null;
  uploadedImageNo: number = 0;
  showMoreUploadBtn: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    private compressImage: CompressImageService,
    private sharedService: SharedService
  ) {
    this.OfferId = this.route.snapshot.queryParamMap.get('id');
    this.offerCategory = this.route.snapshot.queryParamMap.get('category') || 'DRAFT';
    this._offerType = this.route.snapshot.data['offerType'];
  }

  ngOnInit(): void {
    this.mediaSub$ = this.store.pipe(
      select(selectOfferMedias),
      tap(medias => {
        this.hideLoader();
        this.mediaLength = medias.length;
        //if (!!this.mediaLength) {
        const images: UploadResponse[] = medias.filter(media => media.mediaType === MediaTypes.IMAGE);
        const videos: UploadResponse[] = medias.filter(media => media.mediaType === MediaTypes.VIDEO);
        this.videoMediaLength = videos.length;
        this.imageMediaLength = images.length;
        this.currentOfferImages = images;
        this.coverMediaSub = this.imageMediaLength ? images.find(image => image.viewType == CREATE_OFFER_IMAGE_TYPE.COVER.toLowerCase()) : null
        this.frontMediaSub = this.imageMediaLength ? images.find(image => image.viewType == CREATE_OFFER_IMAGE_TYPE.FRONT.toLowerCase()) : null
        this.backMediaSub = this.imageMediaLength ? images.find(image => image.viewType == CREATE_OFFER_IMAGE_TYPE.BACK.toLowerCase()) : null
        this.leftSideMediaSub = this.imageMediaLength ? images.find(image => image.viewType == CREATE_OFFER_IMAGE_TYPE.LEFT.toLowerCase()) : null
        this.rightSideMediaSub = this.imageMediaLength ? images.find(image => image.viewType == CREATE_OFFER_IMAGE_TYPE.RIGHT.toLowerCase()) : null
        this.moreMediaSub = this.moreMediaImages(images, videos);
        // }
      }),
      takeUntil(this.destroy$)
    ).subscribe(noop);

    setTimeout(()=>{
      // console.log('moreMediaSub:', this.moreMediaSub);
    }, 5000)

    

    this.store.pipe(
      select(selectMediaUploadLoader),
      takeUntil(this.destroy$)
    ).subscribe(mediaUpload => {
      this.mediaUploadLoader = mediaUpload
    });

    this.mediaSubError$ = this.store.pipe(
      select(selectOfferError),
      tap(error => {
        this.hideLoader();
        //this.mediaLength = medias.length
      })
    )

    this.store.pipe(
      select(selectOfferInfo),
      takeUntil(this.destroy$)
    )
    .subscribe(res => {
      this.offer = res;
      this.draftId = res.draftOfferId
    });

    this.store.pipe(
      select(selectOfferState),
      takeUntil(this.destroy$)
    )
    .subscribe(res => {
      this.imageUploadFailed = res.imageUploadFailed;
      this.imageDeleteFailed = res.imageDeleteFailed;
      this.errorMessage = res.errorMessage;

      if (res.imageUploadFailed) {
        this.sharedService.showToaster(localization.offer.MEDIA_UPLOAD_FAILURE, 'warning');
        setTimeout(() => {
          this.store.dispatch(CreateOfferActions.unsetImageUploadFailed());
        }, 5000);
      }

      if (res.imageDeleteFailed) {
        setTimeout(() => {
          this.store.dispatch(CreateOfferActions.unsetImageUploadFailed());
        }, 5000);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resetFileReference()
  }

  isPublishedOffer() {
    return this.OfferId && this.offerCategory === 'PUBLISHED';
  }

  uploadMedia(type?: string) {
    this.isMediaLimitExceed = false;
    this.isVideoLimitExceed = false;
    this.files = [];
    // initiate image video files
    this.imageFiles = [];
    this.videoFiles = [];
    const upload = this.fileInputType(type)
    upload.onchange = ($event) => {
      this.separateImageVideoFiles(upload.files, $event, type);
    };
    upload.click();
  }

  async separateImageVideoFiles(uploadFiles: any, event: any, type?: string) {
    const totalLength = this.mediaLength + uploadFiles.length;
   
    
    if (totalLength > this.totalMediaLength) {
      this.isMediaLimitExceed = true;
      return false;
    }
    this.isMediaLimitExceed = false;
    if (uploadFiles.length) {
      for (let file of uploadFiles) {
        if (this.mediaLength < this.totalMediaLength) {
          const fileType = file.type.split('.').pop().toLowerCase();

          // const fileSize = Math.round(file.size / 1024);
          // if (fileSize >= 4096 && fileType.includes(MediaTypes.IMAGE)) {
            // console.log('Files are too big');
          //   return false;
          // }

          if (fileType.includes(MediaTypes.IMAGE)) {
            let compressedImage = await this.compressImage.compress(file)
              .pipe(take(1))
              .toPromise();
            // console.log(`Image size was: ${file.size} in bytes`);
            // console.log(`Image size after compressed: ${compressedImage.size} bytes.`);
            this.imageFiles.push(compressedImage);
          }

          if (fileType.includes(MediaTypes.VIDEO)) {
            this.videoFiles.push(file);
          }
        }
      }
      const totalVideoLength = this.videoFiles.length + this.videoMediaLength;
      if (totalVideoLength >= this.totalMediaLength) {
        this.isVideoLimitExceed = true;
        return false;
      }
      this.isVideoLimitExceed = false;
      if (this.imageFiles.length) {
       // this.openImagePreviewModal(this.imageFiles, event, type);
       this.files = this.imageFiles.length ? [...this.files, ...this.imageFiles] : [];
       this.resetFileReference(type);
       this.showLoader();
       
       this.uploadMediaFiles(this.files, MediaTypes.IMAGE, type);
       if(type==="More"){
        this.uploadedImageNo = this.uploadedImageNo + 1;
        this.checkNoOfImageUploaded();
       }
       
      } else {
        this.files = this.videoFiles.length ? [...this.files, ...this.videoFiles] : [];
        if (!!this.files.length) {
          this.showLoader();
          this.uploadMediaFiles(this.files, MediaTypes.VIDEO, type);
        }
      }
    }
  }

  openImagePreviewModal(files: any[], $event: any, type?: string) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.id = 'media-upload-component';
    dialogConfig.data = {
      files,
      event: $event
    };
    this.dialog.open(ImageComponent, dialogConfig)
      .afterClosed().subscribe(results => {
        this.resetFileReference(type);
        this.showLoader();
        if (results.files) {
          results.files.forEach(file => {
            this.files.push(file);
          });
          // need to check the length
          this.uploadMediaFiles(this.files, MediaTypes.IMAGE, type);
        } else {
          this.hideLoader();
        }
        if (!!this.videoFiles.length) {
          this.uploadMediaFiles(this.videoFiles, MediaTypes.VIDEO, type);
        }
      });
  }

  uploadMediaFiles(files: File[], type?: string, viewType?: string) {
    // const isDraftOffer: boolean = !!this.OfferId && this.offerCategory === 'DRAFT';
    // const isPublishedOffer: boolean = !!this.OfferId && this.offerCategory === 'PUBLISHED';
    const mediaLength = this.mediaLength;
    this.resetFileReference(viewType);
    if (files.length) {
      switch (type) {
        case MediaTypes.IMAGE:
        case MediaTypes.VIDEO:
          if (this.draftId) {
            // draft id present in store call update draft attachment
            this.updateOfferMedia(files, viewType, type);
          } else {
            // no media still present in store call draft creation first
            this.store.dispatch(CreateOfferActions.createDraftOffer({
              offerType: this._offerType,
              files,
              mediaType: type,
              viewType
            }));
          }
          break;
        default:
          break;
      }
    }
  }

  removeMedia(media: UploadResponse, viewType: string) {
    if (!media.id) {
      return;
    }

    if(viewType === 'More') {
      this.uploadedImageNo = this.uploadedImageNo-1;
    }
    
    this.checkNoOfImageUploaded();
    if (this.draftId && !this.isPublishedOffer()) {
      this.store.dispatch(
        CreateOfferActions.removeDraftOfferMedia({
          id: media.id,
          offerId: this.draftId,
          mediaType: media.mediaType,
          viewType
        })
      )
    } else if(this.isPublishedOffer()) {
      // for edit offer
      this.store.dispatch(
        CreateOfferActions.removePublishedOfferMedia({
          id: media.id,
          offerId: this.OfferId,
          mediaType: media.mediaType,
          viewType
        })
      )
    }
  }

  /**
   * update draft offer image
   */

  updateOfferMedia(files: File[], viewType: string, mediaType: string) {
    const formData: FormData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("file[]", files[i]);
      formData.append('displayIndex', i.toString());
      formData.append('viewType', viewType.toLowerCase());
      if(viewType.toLowerCase() === CREATE_OFFER_IMAGE_TYPE.COVER.toLowerCase()) {
        formData.append('cover', 'true');
      }      
      if (this.draftId && !this.isPublishedOffer()) {
        formData.append('draftId', this.draftId);
      } else {
        formData.append('offerId', this.OfferId);
      }
    }
    if (this.draftId && !this.isPublishedOffer()) {
      this.store.dispatch(CreateOfferActions.updateDraftOfferMedia({
        response: this.offer,
        formData,
        mediaType,
        viewType
      }));
    } else if (this.isPublishedOffer()) {
      this.store.dispatch(CreateOfferActions.updatePublishedOfferMedia({
        response: this.offer,
        formData,
        mediaType,
        viewType,
        draftOfferId: this.draftId // required for update state in reducer
      }));
    } else {
      // TODO LATER
    }
    //this.mediaForm.reset();
    this.resetFileReference(viewType);
  }

  showLoader() {
    this.store.dispatch(CreateOfferActions.mediaUploadStart())
  }

  hideLoader() {
    this.store.dispatch(CreateOfferActions.mediaUploadComplete())
  }

  fileInputType(type: string): HTMLInputElement {
    let fileInput = null;
    switch (type) {
      case CREATE_OFFER_IMAGE_TYPE.COVER:
        fileInput = this.coverFileInput.nativeElement as HTMLInputElement;
        break;
      case CREATE_OFFER_IMAGE_TYPE.FRONT:
        fileInput = this.frontFileInput.nativeElement as HTMLInputElement;
        break;
      case CREATE_OFFER_IMAGE_TYPE.BACK:
        fileInput = this.backFileInput.nativeElement as HTMLInputElement;
        break;
      case CREATE_OFFER_IMAGE_TYPE.LEFT:
        fileInput = this.leftFileInput.nativeElement as HTMLInputElement;
        break;
      case CREATE_OFFER_IMAGE_TYPE.RIGHT:
        fileInput = this.rightFileInput.nativeElement as HTMLInputElement;
        break;
      case CREATE_OFFER_IMAGE_TYPE.MORE:
        fileInput = this.myFileInput.nativeElement as HTMLInputElement;
        break;
      default:
        fileInput = null;
        break;
    }
    return fileInput;
  }

  resetFileReference(type?: string) {
    switch (type) {
      case CREATE_OFFER_IMAGE_TYPE.COVER:
        this.coverFileInput.nativeElement.value = '';
        break;
      case CREATE_OFFER_IMAGE_TYPE.FRONT:
        this.frontFileInput.nativeElement.value = '';
        break;
      case CREATE_OFFER_IMAGE_TYPE.BACK:
        this.backFileInput.nativeElement.value = '';
        break;
      case CREATE_OFFER_IMAGE_TYPE.LEFT:
        this.leftFileInput.nativeElement.value = '';
        break;
      case CREATE_OFFER_IMAGE_TYPE.RIGHT:
        this.rightFileInput.nativeElement.value = '';
        break;
      case CREATE_OFFER_IMAGE_TYPE.MORE:
        this.myFileInput.nativeElement.value = '';
        break;
      default:
        break;
    }
  }

  moreMediaImages(images: UploadResponse[], videos: UploadResponse[]) {
    const moreImages = images.length ? images.filter(image => image.viewType == CREATE_OFFER_IMAGE_TYPE.MORE.toLowerCase()) : [];
    const moreVideos = videos.length ? [ ...videos ] : [];
    return [...moreImages, ...moreVideos];
  }

  checkNoOfImageUploaded(){ 
    if(this.uploadedImageNo === 5){
      this.showMoreUploadBtn = false;
    }else{
      this.showMoreUploadBtn = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
