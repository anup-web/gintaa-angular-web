import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrls } from '@gintaa/config/api-urls.config';
import { AddressResponse } from '@gintaa/core/models';
import { Vertical } from '@gintaa/core/models/Category';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { environment } from '@gintaa/env';
import { UploadResponse } from '@gintaa/shared/models';
import { AvailableTags, Country, Offer } from '@gintaa/shared/models/offer';
import { Response } from '@gintaa/shared/models/Response';
import { DefaultDataService, HttpUrlGenerator, Logger } from '@ngrx/data';
import { noop, Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { CREATE_OFFER_TYPE } from '../configs/create-offer.config';

@Injectable({
  providedIn: 'root'
})
export class CreateOfferService extends DefaultDataService<any> {

  categories: any[] = [];
  items: any[] = [];
  constructor(
    http: HttpClient, 
    httpUrlGenerator: HttpUrlGenerator, 
    logger: Logger,
    private firebseStaticService: FirebaseStaticContentService) {
    super('OfferMedia', http, httpUrlGenerator);
    logger.log('Created custom Create Offer EntityDataService');
  }

  addOfferMedia(formData: FormData, url: string, displayIndex?: any): Observable<HttpEvent<Response>> {
    return this.http.post<Response>(`${environment.serverUrl}${url}`,
      formData,
      {
        params: {
          displayIndex: displayIndex || 1
        },
        reportProgress: true,
        observe: 'events'
      }
    );
  }

  updateOfferMedia(type: string, formData: FormData): Observable<HttpEvent<Response>> {
    const url = `${environment.serverUrl}${configUrls.updateDraftOfferMedia}`
    return this.http.post<Response>(`${url}${type}`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    ).pipe(
      map(response => response),
      catchError(this.customError)
    );
  }

  updatePublishedOfferMedia(type: string, formData: FormData): Observable<HttpEvent<Response>> {
    const url = `${environment.serverUrl}${configUrls.updatePublishedOfferMedia}`
    return this.http.post<Response>(`${url}${type}`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    ).pipe(
      map(response => response),
      catchError(this.customError)
    );
  }

  async getCountryList(): Promise<Country[]> {
    return await this.firebseStaticService.getCountryList(); 
 }

  suggestedCategory(data: string[], offerType: string): Observable<any[]> {
    const url = `${environment.serverUrl}${configUrls.suggestedCategory}`;
    // if(!data.length) {
    //   return of([]);
    // }
    return this.http.post<Response>(`${url}`,
      { texts: data, type: offerType }
    ).pipe(
      tap(res => console.log(res)),
      map(response => response.payload || []),
      catchError(this.customError)
    );
  }

  selectedTagsByUserInfo(data: any): Observable<any> {
    const url = `${environment.serverUrl}${configUrls.suggestedTagValues}`
    return this.http.post<Response>(`${url}`,
      { ...data }
    ).pipe(
      map(response => response['payload'] || []),
      catchError(this.customError)
    );
  }

  removeDraftOfferMedia(req: any, mediaType: string): Observable<Response> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: req
    };
    const url: string = `${environment.serverUrl}${configUrls.updateDraftOfferMedia}${mediaType}`;
    return this.http.delete<Response>(url, options)
      .pipe(
        map(response => response),
        catchError(this.customError)
      );
  }

  removePublishedOfferMedia(req: any, mediaType: string): Observable<Response> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: req
    };
    const url: string = `${environment.serverUrl}${configUrls.updatePublishedOfferMedia}${mediaType}`;
    return this.http.delete<Response>(url, options)
      .pipe(
        map(response => response),
        catchError(this.customErrorOffer)
      );
  }

  postOffer(offerData: Offer): Observable<Offer> {
    // remove desire for auction offer
    if(offerData.offerType.toLowerCase() === 'item' && offerData.auctioned === true) {
      delete offerData.desire;
    }
    const url: string = `${environment.serverUrl}${configUrls.postDraftOffer}${offerData.offerType.toLowerCase()}`
    return this.http.post<Response>(url, offerData).pipe(
      map(response => response['payload'] || null),
      catchError(this.customErrorOffer)
    );
  }

  putOffer(offerData: Offer, url: string): Observable<Response> {
    return this.http.put<Response>(`${environment.serverUrl}${url}`, offerData);
  }

  updateOffer(offerData: Offer): Observable<Offer> {
    if(offerData.offerType.toLowerCase() === 'item' && offerData.auctioned === true) {
      delete offerData.desire;
    }    
    const url: string = `${environment.serverUrl}${configUrls.postDraftOffer}${offerData.offerType.toLowerCase()}`
    return this.http.put<Response>(url, offerData).pipe(
      map(response => response['payload'] || null),
      catchError(this.customErrorOffer)
    );
  }

  fetchUserAllAddress(): Observable<any[]> {
    return this.http.get<Response>(`${environment.serverUrl}${configUrls.allAddressUrl}`)
      .pipe(map((res: any) => res['payload'] ? res['payload'] : null));
  }

  saveUserAddress(address: AddressResponse): Observable<any> {
    return this.http.post<Response>(`${environment.serverUrl}${configUrls.addAddressUrl}`, address)
  }

  fetchBusinessDetails(businessId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let requestURL: string = `${environment.serverUrl}${configUrls.getBusinessDetails}`;
    requestURL = requestURL.replace('{businessId}', businessId);
    return this.http.get(requestURL, { headers });
  }

  addBusinessAddress(address: AddressResponse, businessId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let requestURL: string = `${environment.serverUrl}${configUrls.addBusinessAddress}`;
    requestURL = requestURL.replace('{businessId}', businessId);
    return this.http.post(requestURL, address, { headers });
  }

  createCloneOffer(offer: Offer): Observable<Offer> {
    const url: string = `${environment.serverUrl}${configUrls.createDraftOffer}`;
    return this.http.post<Response>(`${url}${offer.offerType?.toLowerCase()}`, offer)
    .pipe(
      map((response: Response) => response.payload ? response.payload : null),
      catchError(this.customError)
    );
  }


  createUpdateDraftOffer(offerType: string, offerData?: Offer): Observable<Offer> {
    const url: string = `${environment.serverUrl}${configUrls.createDraftOffer}`;
    let isAuction: boolean = false;
    let offerDataClone = { ...offerData };
    if (offerType.toLowerCase() === CREATE_OFFER_TYPE.AUCTION.toLowerCase()) {
      offerType = CREATE_OFFER_TYPE.ITEM;
      isAuction = true;
    }
    if (offerData && offerData.dimensions) {
      offerDataClone.dimensions = [{
        ...offerData.dimensions[0],
        quantity: 1
      }]
    }

    let req = this.http.post<Response>(`${url}${offerType?.toLowerCase()}`, { offerType, auctioned: isAuction });
    if (offerData) {
      req = this.http.put<Response>(`${url}${offerType?.toLowerCase()}`, offerDataClone);
    }
    return req
      .pipe(
        map((response: Response) => response.payload ? response.payload : null),
        catchError(this.customError)
      );
  }

  updateDraftOffer(draftOfferObj: Offer, url: string): Observable<any> {
    return this.http.put<Response>(`${environment.serverUrl}${url}`, draftOfferObj)
      .pipe(
        map((response: Response) => response.payload ? response.payload : null),
        tap(
          data => {
            // console.log('response data:::', data)
            //this.loadingScreenService.stopLoading();
          },
          error => {
            // this.loadingScreenService.stopLoading();
            //this.handleError(error);
            this.customError(error);
          }
        )
      );
  }

  getDraftOfferById(offerId: string): Observable<Offer> {
    let url = `${environment.serverUrl}${configUrls.getDraftOfferById}`;
    url = url.replace('{offerId}', offerId);
    return this.http.get<Response>(url)
      .pipe(
        map((response: Response) => response.payload ? response.payload : null),
        catchError(this.customError)
      );
  }

  fetchPublishedData(offerId: string): Observable<Offer> {
    let url = `${environment.serverUrl}${configUrls.getOfferById}`;
    url = url.replace('{offerId}', offerId);
    return this.http.get<Response>(url)
      .pipe(
        map((response: Response) => response.payload ? response.payload : null),
        catchError(this.customError)
      );
  }

  //fetching all verticals of a category

  fetchAllCategories(item: string): Observable<Vertical[]> {
    const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}`
    return this.http.get<Response>(url)
      .pipe(
        map((res: any) => res['payload'] ? res['payload'] : null),
        shareReplay()
      );
  }

  findAllCategories(item: string): Observable<Vertical[]> {
    const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}?type=${item}`
    return this.http.get<Response>(url)
      .pipe(
        map((res: any) => res['payload'] ? res['payload'] : null)
      );
  }

  findRootCategories(verticalId: string): Observable<any> {
    let depth: HttpParams = new HttpParams();
    depth = depth.append('depth', '1');
    const url: string = `${environment.serverUrl}${configUrls.getRootCategoryUrl}`.replace('{verticalId}', verticalId)
    return this.http.get<any>(url, {
      params: depth
    }).pipe(
        map((res: any) => res['payload'] ? res['payload'] : []),
        shareReplay(),
        catchError(this.customError)
      );
  }

  findCategoryTree(categoryId: string, depthIndex: string = '1'): Observable<any> {
    let depth: HttpParams = new HttpParams();
    depth = depth.append('depth', depthIndex);
    const url: string = `${environment.serverUrl}${configUrls.getCategoriesInRootCategory}`.replace('{categoryId}', categoryId);
    // const url: string = `../../../assets/mock/mock-sub-categories.json`;
    return this.http.get<any>(url, {
      params: depth
    }).pipe(
      map(res => res['payload'] ? res['payload'] : []),
      shareReplay(),
      catchError(this.customError)
    );
  }

  getAllTagsByCategoryId(categoryId: string): Observable<AvailableTags[]> {
    // const url: string = `${environment.serverUrl}${configUrls.getAddTagUrl}`.replace('{categoryId}', '3KacjBHWVQ5z6TcX2pKnXe')
    const url: string = `${environment.serverUrl}${configUrls.getAddTagUrl}`.replace('{categoryId}', categoryId);
    return this.http.get<Response>(url)
      .pipe(
        map(res => res['payload'] || []),
        shareReplay(),
        catchError(this.customError)
      );
  }

  setFinalTags(categories: any[]): void {
    this.categories = categories;
  }

  setDesireSelectedTags(items: any[]): void {
    this.items = items;
  }

  getSelectedCategories(): any[] {
    return this.categories;
  }

  getLeafNodeCategoryId(): string {
    let categoryId: string = null;
    this.categories.forEach(item => {
      if (item.leafNode) {
        categoryId = item.categoryId;
      }
    })
    return categoryId;
  }

  getCurrentNodeCategoryId(): string {
    let categoryId: string = this.getLeafNodeCategoryId();
    if (!categoryId && this.categories.length) {
      //return categoryId;
      let { [this.categories.length - 1]: last } = this.categories;
      categoryId = last.categoryId;
    }
    return categoryId;
  }

  getFinalTags(): any[] {
    let presentTagCategories = [];
    let tagObjArray = [];
    this.categories.forEach(item => {
      if (item.tagId || (item.tagId === '' && item.name)) {
        presentTagCategories.push(item)
      }
    })
    if (presentTagCategories.length) {
      presentTagCategories.forEach((tagCategory) => {
        let isMatched = null;
        let tagObj = {};
        const primaryFacet = (tagCategory.tagId === '' && tagCategory.name) ? tagCategory.name : tagCategory.facetLabel;
        tagObjArray.forEach((item) => {
          if (item.name === primaryFacet) {
            isMatched = true;
            item.values = tagCategory.tagId === '' && tagCategory.name ?
              [...item.values, tagCategory.label] : [...item.values, tagCategory.value]
          }
        })
        if (!isMatched) {
          tagObj = !(tagCategory.tagId === '' && tagCategory.name) ? {
            "name": primaryFacet,
            "label": primaryFacet,
            "values": [
              tagCategory.value
            ]
          } : {
            "name": primaryFacet,
            "label": primaryFacet,
            "values": [
              tagCategory.label
            ]
          }
          tagObjArray = [...tagObjArray, tagObj]
        }
      });
      // console.log('Before Return:::::', tagObjArray); 
      return tagObjArray;
    }
    // console.log('Finnally:::::', tagObjArray);
    return tagObjArray;
  }

  public removeDraftOfferById(draftOfferId: string): Observable<Response> {
    const url: string = `${environment.serverUrl}${configUrls.removeDraftOfferById}${draftOfferId}`;
    return this.http.delete<Response>(url);
  }

  public getSuggestionCategory(searchText: string, offerType: string) {
    const url: string = `${environment.serverUrl}${configUrls.getOfferSearch}`;
    let params: HttpParams = new HttpParams();
    params = params.append('text', searchText)
    .append('type', offerType);
    return this.http.get<Response>(url, {
      params
    }).pipe(
      map(response => response['payload'] || []),
      catchError(this.customError)
    );
  }

  public formatServiceTime(time): string {
    const formatTime = new Date(time);
    const hours = formatTime.getHours() < 10 ? '0' + formatTime.getHours() : formatTime.getHours();
    const minutes = formatTime.getMinutes() < 10 ? '0' + formatTime.getMinutes() : formatTime.getMinutes();
    const seconds = formatTime.getSeconds() < 10 ? '0' + formatTime.getSeconds() : formatTime.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  private customError(error: HttpErrorResponse) {
    //this.loadingScreenService.stopLoading();
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  private customErrorOffer(error: any) {
    if (error.error.payload && error.error.payload.length) {
      return throwError(error.error.payload[0]?.reason);
    } else {
      return throwError(error.error.message);
    }
  }

  private customErrorMediaDelete(error: any) {
    if (error.error.message) {
      return throwError(error.error.message);
    } else {
      return throwError(error.error.message);
    }
  }
}
