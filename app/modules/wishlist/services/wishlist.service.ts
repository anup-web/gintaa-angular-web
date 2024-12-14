import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DefaultDataService, HttpUrlGenerator, Logger } from '@ngrx/data';
import { Vertical } from '@gintaa/core/models/Category';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends DefaultDataService<any>  {

  constructor (http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('OfferMedia', http, httpUrlGenerator);
    logger.log('Created custom Create wishlist EntityDataService');
  }

  findAllCategoriesBySearchKeyWord(searchKeyword: string): Observable<Response> {
    
    // const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}?type=${searchKeyword}`
    // const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}?s=${searchKeyword}`
    const url = `../../../assets/mock-wishlist-tags.json?s=${searchKeyword}`;
    // console.log('url:', url);
    return this.http.get<Response>(url)
    .pipe(
      map((res: any) => res['payload'] ? res['payload'] : null)
    );
  }

  getRelativeOffers(searchKeyword: string): Observable<Response> {
    
    // const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}?type=${searchKeyword}`
    // const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}?s=${searchKeyword}`
    const url = `../../../assets/mock-wishlist-relative-offers.json?s=${searchKeyword}`;
    // console.log('url:', url);
    return this.http.get<Response>(url)
    .pipe(
      map((res: any) => res['payload'] ? res['payload'] : null)
    );
  }


  getWishlist(): Observable<Response> {
    
    // const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}?type=${searchKeyword}`
    // const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}?s=${searchKeyword}`
    const url = `../../../assets/mock-wishlist-list.json`;
    // console.log('url:', url);
    return this.http.get<Response>(url)
    .pipe(
      map((res: any) => res['payload'] ? res['payload'] : null)
    );
  }


}
