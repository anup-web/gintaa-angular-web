import { Injectable } from '@angular/core';
import { environment } from '@gintaa/env';
import { TitleTagService } from '../services/title-tag.service';
import { TagsSeo, SocialShare, Response } from '../models';
import { Observable } from 'rxjs';
import { configUrls } from '@gintaa/config/api-urls.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferShareService {

  constructor(private titleTagService: TitleTagService, private http: HttpClient) { }

  setMetaTags(response) {
    const socialData = this.getSocialDetail(response);
    const seo: TagsSeo = {
      title: socialData.title,
      description: socialData.description,
      image: socialData.imageUrl,
      url: socialData.shareUrl,
    };
    this.titleTagService.setSeo(seo);
    return response;
  }

  getSocialDetail(offerDetail: Offer): SocialShare {
    const socialShare = {} as SocialShare;
    socialShare.shareUrl = this.getShareUrl(offerDetail);
    const imgUrl = this.getImageUrl(offerDetail);
    if (imgUrl) {
      socialShare.imageUrl = imgUrl;
    }
    socialShare.description = offerDetail.description;
    socialShare.title = offerDetail.name;
    return socialShare;
  }

  private getShareUrl(offerDetail: Offer): string {
    return `${environment.websiteUrl}/offer/share/${offerDetail.seOId}`;
  }

  private getImageUrl(offerDetail: Offer): string {
    return offerDetail.images && offerDetail.images.length ? offerDetail.images[0].url : '';
  }

  hideOfferDetailsByOfferId(offerId: string): Observable<Response>{
    let url: string = `${environment.serverUrl}${configUrls.hideOfferByOfferId}`;
    url = url.replace('{oid}', offerId);
    return this.http.post<Response>(url, null);
  }

  unhideOfferDetailsByOfferId(offerId: string): Observable<Response>{
    let url: string = `${environment.serverUrl}${configUrls.unhideOfferByOfferId}`;
    url = url.replace('{oid}', offerId);
    return this.http.post<Response>(url, {offerId});
  }

  getAuctionDetails(): Observable<Response> {
    let url: string = '../../../assets/mock/mock-auction.json';
    return this.http.get<Response>(url);
  }

  removeOfferByOfferId(offerId: string): Observable<Response> {
    let url: string = `${environment.serverUrl}${configUrls.removeOfferByOfferId}`;
    url = url.replace('{oid}', offerId);
    return this.http.delete<Response>(url);
  }

  previewOfferDocument(doc: any): Observable<Response | Blob> {
    const headers: HttpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'text/html; charset=UTF-8'
      // 'Content-Type': 'multipart/form-data; boundary=something'
    });
    return this.http.get(
      doc.url, {responseType: 'blob', headers}).pipe(
        tap( // Log the result or error
        data => console.log(),
        error => console.log()
      ));
  }

  getOwnerByOfferId(offerId: string) {
    let url: string = `${environment.serverUrl}${configUrls.getDealByOfferId}`;
    url = url.replace('{offerId}', offerId);
    return this.http.get<Response>(url);
  }
}
