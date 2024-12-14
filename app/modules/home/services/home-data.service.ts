import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrls } from '@gintaa/config/api-urls.config';
import { AuthService } from '@gintaa/core/services';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { environment } from '@gintaa/env';
import { CreateBusinessProfileRequest } from '@gintaa/shared/models';
import { Offer } from '@gintaa/shared/models/offer';
import { DefaultDataService, HttpUrlGenerator, Logger } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class HomeDataService extends DefaultDataService<Offer> {
    auctionsOfTheDay: object[] = [];

    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
        logger: Logger,
        private authService: AuthService,
        private firebseStaticService: FirebaseStaticContentService
    ) {
        super('AllOffers', http, httpUrlGenerator);
        logger.log('Created custom Home Offer EntityDataService')
    }

    getAll(): Observable<Offer[]> {
        const url: string = `${environment.serverUrl}${configUrls.loggedInUserPublishedOffers}`;
        const httpParams: HttpParams = new HttpParams()
            .set('page', '0')
            .set('size', '8')
        return this.http.get(url, {
            params: httpParams
        }).pipe(
            map(res => res["payload"])
        );
    }

    getAllRecentOffers(size:number = null): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.loggedInUserPublishedOffers}`;
        url = (size) ? url+'?size='+size : url
        return this.http.get(url).pipe(
            map(res => res["payload"]),
            shareReplay()
        );
    }

    getLastViewedOffers(params: { page?: string, size?: string }): Observable<Offer[]> {
        const url: string = `${environment.serverUrl}${configUrls.lastViewedOffer}`;
        const httpParams: HttpParams = new HttpParams()
            .set('page', params.page || '0')
            .set('size', params.size || '8')
        return this.http.get(url, {
            params: httpParams
        }).pipe(
            map(res => res["payload"]),
            // take(1),
            shareReplay()
        );
    }

    getTrendingOffers(params: { page?: string, size?: string }): Observable<Offer[]> {
        const url: string = `${environment.serverUrl}${configUrls.getTrendingOffers}`;
        //const httpParams: HttpParams = new HttpParams()
        //.set('page', params.page || '0')
        //.set('size', params.size || '10')
        return this.http.get(url, {
            //params: httpParams
        }).pipe(
            map(res => res["payload"]),
            shareReplay()
        );
    }

    getPopularCategories(params: { page?: string, size?: string }): Observable<any[]> {
        const url: string = `${environment.serverUrl}${configUrls.getPopularCategories}`;
        // const httpParams: HttpParams = new HttpParams()
        // .set('page', params.page || '0')
        // .set('size', params.size || '10')
        return this.http.get(url, {
            // params: httpParams
        }).pipe(
            map(res => Object.values(res["payload"])),
            shareReplay()
        );
    }

    getSearchOffers(input: { value: string, category: string, matchCountMax?: string, size?: number }): Observable<Offer[]> {
        // let queryParams = `?q=${input.value}&page=${input.page || 0 }&size=${input.size || 10}`;
        let queryParams = `?desire=${input.value}`;
        if (input.matchCountMax) {
            queryParams = `${queryParams}&matchCountMax=${input.matchCountMax}`
        }
        let url: string = `${environment.serverUrl}${configUrls.searchMatchFullText}${queryParams}`;
        return this.http.get(url).pipe(
            map(res => res["payload"])
        );
    }

    createBusinessProfileMock(requestBody: CreateBusinessProfileRequest) {
        let queryParams = '';
        let url: string = `${environment.serverUrl}${configUrls.createBusinessProfile}${queryParams}`;

        return of({
            status: 200,
            success: true,
            payload: {
                messege: 'Business account created successfully'
            }
        })
    }

    createBusinessProfile(requestBody: CreateBusinessProfileRequest) {
        let queryParams = '';
        let url: string = `${environment.serverUrl}${configUrls.createBusinessProfile}${queryParams}`;

        return this.http.post(url, requestBody).pipe(
            map(res => res["payload"])
        );
    }

    fetchBusinessProfiles(status: string = null) {
        let requestURL = `${environment.serverUrl}${configUrls.fetchBusinessProfiles}`;
        if (status) {
            requestURL = `${requestURL}?status=${status}`;
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get(requestURL, { headers });
    }

    fetchMemberBusinessProfiles() {
        const requestURL = `${environment.serverUrl}${configUrls.fetchMemberBusinessProfiles}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get(requestURL, { headers });
    }

    getmatchData(matchCountMax = ''): Observable<any[]> {
        let reqUrl = `${environment.serverUrl}${configUrls.searchMatchUser}`;
        if (matchCountMax) {
            reqUrl = `${reqUrl}?matchCountMax=${matchCountMax}`
        }
        return this.http.get<any[]>(reqUrl);
        // return this.http.get(reqUrl)
        //     .pipe(
        //         map(res => {
        //             return res['payload'];
        //         }, err => {
        //             return throwError(err)
        //         })
        //     );
    }

    addOfferToFavourite(offerId: string) {
        const url = `${environment.serverUrl}${configUrls.addOfferToFavourite}${offerId}`;
        return this.http.post<any[]>(url, { offerId });
    }

    removeOfferFromFavourite(offerId: string) {
        const url = `${environment.serverUrl}${configUrls.removeOfferFromFavourite}${offerId}`;
        return this.http.delete<any[]>(url);
    }

    getFavouriteOfferCount(offerId: string) {
        const url = `${environment.serverUrl}${configUrls.getFavouriteOfferCountNew}${offerId}`;
        return this.http.get<any[]>(url);
    }

    getOfferStatistics(offerId: string) {
        // ?identityId=${offerId}
        const url = `${environment.serverUrl}${configUrls.offerStat}/${offerId}`;
        return this.http.get<any[]>(url);
    }

    getRecommendedOffer() {
        const url = `${environment.serverUrl}${configUrls.getRecommendedOffers}`;
        return this.http.get<any[]>(url).pipe(shareReplay());
    }

    getUserDraftOffers(): Observable<Offer[]> {
        const url = `${environment.serverUrl}${configUrls.loggedInUserDraftOffers}?&page=1&size=8&sort=publishedDate`;
        return this.http.get<Offer[]>(url)
            .pipe(map(response => response['payload'] || []));
    }

    getAllHomePageData(): Observable<any> {
        // ?identityId=${offerId}
        //const url = `${environment.serverUrl}${configUrls.offerStat}/${offerId}`;
        const url = '../../../assets/mock/mock-home.json'
        return this.http.get<any[]>(url).pipe(
            map(res => res['payload'] || null),
            shareReplay()
        );
    }

    getBannerData(): Observable<any> {    
        return of(this.firebseStaticService.getBanners());
    }

    

    fetchBusinessInvitations() {
        const requestURL = `${environment.serverUrl}${configUrls.fetchBusinessInvitations}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get(requestURL, { headers });
    }

    acceptInvitation(businessId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.acceptInvitation}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(requestURL, null, { headers });
    }

    rejectInvitation(businessId: string, reason: string) {
        let requestURL = `${environment.serverUrl}${configUrls.rejectInvitation}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = `${requestURL}${reason}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(requestURL, null, { headers });
    }


    addReceiveAccountCredential(requestBody: any) {
        let requestURL = `${environment.serverUrl}${configUrls.addReceivePaymentDetails}`;
        if(requestBody.businessId != undefined && requestBody.businessId) {
            requestURL = `${environment.serverUrl}${configUrls.addReceivePaymentDetailsForBusiness}`;
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(requestURL, requestBody, { headers });
    }


    updateReceivePaymentDetails(requestBody: any) {
        let requestURL = `${environment.serverUrl}${configUrls.updateReceivePaymentDetails}`;
        if(requestBody.businessId != undefined && requestBody.businessId) {
            requestURL = `${environment.serverUrl}${configUrls.updateReceivePaymentDetailsForBusiness}`;
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.put(requestURL, requestBody, { headers });
    }


    getAllReceiveAccountCredentialList() {
        let requestURL = `${environment.serverUrl}${configUrls.getReceivePaymentDetailsList}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get(requestURL, { headers });
    }


    getAllReceivePaymentListForBusiness(businessId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.getReceivePaymentDetailsListForBusiness}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get(requestURL, { headers });
    }


    deleteReceivePaymentAccount(paymentDetailId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.deleteReceivePaymentDetailsById}`;
        requestURL = requestURL.replace('{receivePaymentDetailsId}', paymentDetailId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        // paymentDetailId

        return this.http.delete(requestURL, { headers });
    }


    deleteReceivePaymentAccountForBusiness(paymentDetailId: string, businessId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.deleteReceivePaymentDetailsByIdForBusiness}`;
        requestURL = requestURL.replace('{businessId}', businessId);
        requestURL = requestURL.replace('{receivePaymentDetailsId}', paymentDetailId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        // paymentDetailId

        return this.http.delete(requestURL, { headers });
    }


    getMigrationDataForBusiness() {
        let requestURL = `${environment.serverUrl}${configUrls.getBusinessMigration}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get(requestURL, { headers });
    }

}
