import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from '@gintaa/config/constant.config';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { selectOfferDocuments, selectOfferInfo, selectOfferSectionoggles } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { MediaTypes, UploadResponse } from '@gintaa/shared/models';
import { Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs-compat/Observable';
import { tap } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { CreateOfferSectionToggles } from '@gintaa/modules/create-offer/store/models/create-offer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  files: File[] = [];
  acceptDocumentType: string[] = APP_CONSTANTS.DOCUMENT_EXT_WHITE_LIST;
  draftId: string;
  offer: Offer;
  documents$: Observable<UploadResponse[]>;
  docCounts: number = 0
  showDropZonePreview: boolean = false;
  sectionToggles: CreateOfferSectionToggles;
  OfferId: string = null;
  offerCategory: string = 'DRAFT';

  constructor(
    private store: Store<gintaaApp.AppState>,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { 
    this.OfferId = this.route.snapshot.queryParamMap.get('id');
    this.offerCategory = this.route.snapshot.queryParamMap.get('category') || 'DRAFT';
  }

  ngOnInit(): void {
    this.store.pipe(select(selectOfferInfo))
    .subscribe(res => {
      this.offer = res;
      this.draftId = res.draftOfferId
    });
    this.documents$ = this.store.pipe(
      select(selectOfferDocuments),
      tap(res => this.docCounts = res ? res.length : 0)
    );
    this.store.pipe(
      select(selectOfferSectionoggles)
    ).subscribe(sectionToggles => {
      this.sectionToggles = { ...sectionToggles };
    });
  }

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    this.updateDraftOfferDocument(this.files);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  updateDraftOfferDocument(files: any[]) {
    const formData: FormData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("file[]", files[i]);
      formData.append('displayIndex', (i + 1 + this.docCounts).toString());
      if (this.draftId && !this.isPublishedOffer()) {
        formData.append('draftId', this.draftId);
      } else {
        formData.append('offerId', this.OfferId);
      }  
    }
    const mediaType: string = MediaTypes.DOCUMENT;
    if (this.draftId && !this.isPublishedOffer()) {      
      this.store.dispatch(CreateOfferActions.updateDraftOfferMedia({ 
        response: this.offer, 
        formData, 
        mediaType
      }));
    } else if (this.isPublishedOffer()) {
      this.store.dispatch(CreateOfferActions.updatePublishedOfferMedia({
        response: this.offer,
        formData,
        mediaType
      }));
    }
  }  

  removeDocument(doc: UploadResponse) {
    if (!doc.id) {
      return;
    }
    if (this.draftId && !this.isPublishedOffer()) {
      this.store.dispatch(
        CreateOfferActions.removeDraftOfferMedia({
          id: doc.id,
          offerId: this.draftId,
          mediaType: MediaTypes.DOCUMENT,
          viewType: 'document'
        })
      );
    } else if(this.isPublishedOffer()) {
      // for edit offer
      this.store.dispatch(
        CreateOfferActions.removePublishedOfferMedia({
          id: doc.id,
          offerId: this.OfferId,
          mediaType: MediaTypes.DOCUMENT,
          viewType: 'document'
        })
      )
    }
  }

  isPublishedOffer() {
    return this.OfferId && this.offerCategory === 'PUBLISHED';
  }

  previewDocument(doc: any) {
    this.http.get(doc.url, {responseType: 'blob'}).pipe(
      tap(
        data => console.log(),
        error => console.log()
      )
    ).subscribe(results => {
      FileSaver.saveAs(results, doc.orgName);
    });
  }

}
