import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrls } from '@gintaa/config/api-urls.config';
import { environment } from '@gintaa/env';
import { Response } from '@gintaa/shared/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { defaultConfigMyOffer } from '../configs/my-offer.constant';
import { Offer, OfferInput } from '../models/my-offers.model';

@Injectable({
  providedIn: 'root'
})
export class MyOfferService {

  params: OfferInput;

  public filterValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  filterValue$ = this.filterValue.asObservable();

  public removeOfferType: Subject<any> = new Subject<any>();
  removeOfferType$ = this.removeOfferType.asObservable();

  constructor(private http: HttpClient) {
    this.params = {
      page: defaultConfigMyOffer.page,
      offset: defaultConfigMyOffer.offset,
      offerTypes: []
    }
  }

  getLoggedInUserOffers(input: OfferInput = {}, offerTypeUrl?: string): Observable<Offer[]>{
    this.params = { ...this.params, ...input };
    const httpParams: HttpParams = new HttpParams()
    .set('page', this.params.page.toString())
    // .set('size', this.params.offset.toString())
    .set('sort', 'publishedDate');
    const url: string = `${environment.serverUrl}${offerTypeUrl}`;
    return this.http.get<Response>(url, {
      params: httpParams
    }).pipe(map(response => response.payload || []));
  }
  

  getUserActiveOffers(input: OfferInput = {}): Observable<Offer[]>{
    this.params = { ...this.params, ...input };
    const url: string = `${environment.serverUrl}${configUrls.loggedInUserActiveOffers}&page=${this.params.page}&size=${this.params.offset}&sort=OfferType`;
    return this.http.get<Response>(url).pipe(map(response => response.payload || []));
  }

  getUserDraftOffers(input: OfferInput = {}): Observable<Offer[]> {
    this.params = { ...this.params, ...input };
    const url = `${environment.serverUrl}${configUrls.loggedInUserDraftOffers}?&page=${this.params.page}&size=${this.params.offset}&sort=publishedDate`
    return this.http.get<Response>(url).pipe(map(response => response.payload || []));
  }
}
