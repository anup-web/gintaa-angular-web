import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@gintaa/env';
import { sharedApiUrls } from '../configs/shared-api-url.config';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  getOfferDetail(offerId: any){
    let url = `${environment.serverUrl}${sharedApiUrls.getOfferById}`;
    url = url.replace('{offerId}', offerId);
    return this.http.get(url)
  }
}
