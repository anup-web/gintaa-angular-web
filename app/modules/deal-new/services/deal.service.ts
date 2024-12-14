import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';

import { InitiateDealRequestObject, DealUpdateReqFormat, DealInjectOffer, FetchDealRequestObject } from '@gintaa/modules/deal-new/models/deal.model';
import { SaveRatingRequestObject } from '@gintaa/modules/deal-new/models/rating.model';
import { LoggerService } from '@gintaa/core/services/logger.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Offer } from '@gintaa/modules/deal-new/models/deal.model';
import { Response } from '@gintaa/shared/models';
import { Insurance } from '../models/insurance.model';

@Injectable({
    providedIn: 'root'
})
export class DealService {
    constructor(
        private httpClient: HttpClient,
        private logger: LoggerService
    ) { }

    myOffersSubject$ = new BehaviorSubject<DealInjectOffer[]>([]);
    myOffersSubjectObserver$ = this.myOffersSubject$.asObservable();

    initiateDeal(requestBody: InitiateDealRequestObject) {
        const requestURL = `${environment.serverUrl}${configUrls.getInitiateDealUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(requestURL, requestBody, { headers, observe: 'response' });
    }

    reviseDeal(requestBody: InitiateDealRequestObject) {
        const requestURL = `${environment.serverUrl}${configUrls.getReviseDealUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.put(requestURL, requestBody, { headers, observe: 'response' });
    }

    dealUpdateReq({ comments, dealRefId }: DealUpdateReqFormat) {
        const requestURL = `${environment.serverUrl}${configUrls.getUpdateDealReqUrl}/${dealRefId}?comments=${comments}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.put(requestURL, { headers, observe: 'response' });
    }

    getDealsExpiryDate() {
        const requestURL = `${environment.serverUrl}${configUrls.getExpiryDateUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.logger.serviceLogger({
            origin: 'deal',
            operationName: configUrls.getExpiryDateUrl,
            operationType: 'GET'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getJintaaJunctions(lat: any, lng: any, destinationOfferIds: any) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        // .append('_lat', lat.toString())
        // .append('_lng', lng.toString());
        // const queryParams = `?destinationOfferIds=${destinationOfferIds}`;
        // const requestURL = `${environment.serverUrl}${configUrls.getAllJintaaJunctionUrl}${queryParams}`;
        
        const requestURL = `${environment.serverUrl}${configUrls.getAllJintaaJunctionUrl}/all`;
        return this.httpClient.get(requestURL, { headers });
    }

    getDealDetails(dealId: string) {
        let requestURL = `${environment.serverUrl}${configUrls.getDealFromIdUrl}`;
        requestURL = requestURL.replace('{dealId}', dealId);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.get(requestURL, { headers });
    }

    getAllDeal(input: FetchDealRequestObject) {
        // const descSortQuery = '&sort=offeredDate,desc&sort=offeredTime,desc';
        const descSortQuery = '';
        let queryParams = `?status=${input.status}&page=${input.page}&size=${input.size}${descSortQuery}`;
        if (input.type && input.type !== '') {
            queryParams = `${queryParams}&type=${input.type}`;
        }
        if (input.startDate && input.startDate !== '') {
            queryParams = `${queryParams}&startDate=${input.startDate}`;
        }
        if (input.endDate && input.endDate !== '') {
            queryParams = `${queryParams}&endDate=${input.endDate}`;
        }
        if (input.sortBy && input.sortBy !== '') {
            queryParams = `${queryParams}&sortBy=${input.sortBy},desc`;
        }
        const reqUrl = `${environment.serverUrl}${configUrls.getAllDeal}${queryParams}`;
        return this.httpClient.get(reqUrl);
    }

    getDealSnapshot(dealId: string) {
        const requestURL = `${environment.serverUrl}${configUrls.getDealSnapshotFromIdUrl}/${dealId}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getDealHistory(dealId: string) {
        const requestURL = `${environment.serverUrl}${configUrls.getDealHistoryFromIdUrl}/${dealId}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getDealRating(dealId: string, receiverIdentityId: string, senderIdentityId: string) {
        const requestURL = `${environment.serverUrl}${configUrls.getDealRatingFromIdUrl}/${dealId}?receiverIdentityId=${receiverIdentityId}&senderIdentityId=${senderIdentityId}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getUserAddress() {
        const requestURL = `${environment.serverUrl}${configUrls.allAddressUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getUserLocation(destinationOfferIds: any, currentLocation: any ='') {
        const requestURL = `${environment.serverUrl}${configUrls.getDealLocationUrl}?offerIds=${destinationOfferIds}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (currentLocation?._lng) {
            headers.append('_lat', currentLocation._lat.toString()).append('_lng', currentLocation._lng.toString());
        }
        return this.httpClient.get(requestURL, { headers });
    }

    cancelDeal(dealRefId: string, comments: string = '') {
        const requestURL = `${environment.serverUrl}${configUrls.getCancelDealUrl}/${dealRefId}?comments=${comments}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.put(requestURL, { headers, observe: 'response' });
    }

    acceptDeal(dealRefId: string, doorStepDeliveryInfo: any = '') {
        const requestURL = `${environment.serverUrl}${configUrls.acceptDeal}`;

        if (doorStepDeliveryInfo == '') {
            const requestBody = {
                dealRefNo: dealRefId
            };
            return this.httpClient.post(requestURL, requestBody);
        } else {
           
            if(doorStepDeliveryInfo?.insuranceOpted){
                const requestBody = {
                    dealRefNo: dealRefId,
                    doorStepDeliveryInfo: doorStepDeliveryInfo,
                    includeInsurance: doorStepDeliveryInfo?.insuranceOpted,
                    insuranceAmount: doorStepDeliveryInfo?.insuranceAmount,
                };
                return this.httpClient.post(requestURL, requestBody);
            } else {
                const requestBody = {
                    dealRefNo: dealRefId,
                    doorStepDeliveryInfo: doorStepDeliveryInfo,
                    includeInsurance: false,
                    insuranceAmount: '0',
                };
                return this.httpClient.post(requestURL, requestBody);
            }
        }
    }

    rejectDeal(input) {
        const comment = input.comment || 'comments';
        const queryParams = `/${input.dealRefId}?comments=${comment}`;
        const reqUrl = `${environment.serverUrl}${configUrls.rejectDeal}${queryParams}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.put(reqUrl, { headers });
    }

    closeDeal(dealRefNo: string, otp: string) {
        const requestURL = `${environment.serverUrl}${configUrls.closeDealUrl}`;
        const requestBody = {
            dealRefNo,
            otp,
        };
        return this.httpClient.post(requestURL, requestBody);
    }

    generateCloseDealOtp(dealRefNo: string) {
        const requestURL = `${environment.serverUrl}${configUrls.generateCloseDealOtp}/${dealRefNo}`;
        return this.httpClient.post(requestURL, {});
    }

    getRatingConfig() {
        const requestURL = `${environment.serverUrl}${configUrls.dealRatingConfigUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getQuestionsForRatingContext(contextId: string, rating: number = 1) {
        const requestURL = `${environment.serverUrl}${configUrls.dealRatingQuestionsUrl}/${contextId}/${rating}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getQuestionsForRating(rating: number = 1) {
        const requestURL = `${environment.serverUrl}${configUrls.dealDviewRatingQuestionsUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    saveDealUserRating(requestBody: SaveRatingRequestObject) {
        const requestURL = `${environment.serverUrl}${configUrls.saveDealUserRatingReview}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(requestURL, requestBody, { headers, observe: 'response' });
    }

    getUserRating(userId: string) {
        const requestURL = `${environment.serverUrl}${configUrls.saveDealUserRatingReview}/summary/${userId}`;
        return this.httpClient.get(requestURL);
    }

    getUserAllOffer(userId = '', isbusiness = false): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.myNewOffers}`;
        if (isbusiness) {
            url = `${url}/filter?states=active`;
        } else {
            url = `${url}/all/${userId}`;
        }
        return this.httpClient.get(url)
            .pipe(
                map(res => {
                    const data = res["payload"];
                    return data;
                })
            );
    }

    getUserCounterPartyAllOffer(userId = '', isbusiness = false, offerId = ''): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.myNewOffers}`;
        if (isbusiness) {
            url = `${url}/${offerId}/siblings`;
        } else {
            url = `${url}/all/${userId}`;
        }
        return this.httpClient.get(url)
            .pipe(
                map(res => {
                    const data = res["payload"];
                    if (isbusiness) {
                        let responseData = [];
                        if (data['Item']) {
                            responseData = [...data['Item']];
                        }
                        if (data['Service']) {
                            responseData = [...responseData, ...data['Service']];
                        };
                        return responseData;
                    } else {
                        return data;
                    }
                })
            );
    }

    getUserCounterPartyAllOfferWithOffer(userId = '', offerIdsArr = []): Observable<any[]> {
        const offerIds = offerIdsArr.map((val) => val.offerId);
        const offerQuery = encodeURI(offerIds.join('|'));
        const queryParams = `?oids=${offerQuery}`;
        const requestURL = `${environment.serverUrl}${configUrls.offerByIds}${queryParams}`;
        return this.httpClient.get(requestURL).pipe(
            map(res => {
                const response = res["payload"];
                const data = offerIdsArr.map((val) => {
                    return response[val.offerId]
                })
                return data.filter((val) => val?.offerId);
            })
        );

        //let url: string = `${environment.serverUrl}${configUrls.myNewOffers}`;
        // if (offerIdsArr[0] && offerIdsArr[0]['offerId']) {
        // url = `${url}/${offerIdsArr[0]['offerId']}/siblings`;
        // return this.httpClient.get(url)
        // .pipe(
        //     map( res => {
        //         const data = res["payload"];
        //         let responseData = [];
        //         if (data['Item']) {
        //             responseData = [...data['Item']];
        //         }
        //         if (data['Service']) {
        //             responseData = [...responseData, ...data['Service']];
        //         };
        //         let url: string = `${environment.serverUrl}${configUrls.getOfferById}`;
        //         url = url.replace('{offerId}', offerIdsArr[0]['offerId']);
        //         // const offerData = await this.httpClient.get(url)
        //         //     .pipe(
        //         //         map(res => {
        //         //             const data = res["payload"];
        //         //             return [data]
        //         //         }),
        //         //         catchError(error => of([]))
        //         //     );
        //         return responseData;
        //     })
        // );
        // } else {
        //     return [];
        // }
    }

    getUserAllOfferById(userId = '', businessId=''): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.myNewOffers}/all/${userId}`;
        if(businessId && businessId!=''){
            url = `${url}?businessId=${businessId}`
        }
        return this.httpClient.get(url)
            .pipe(
                map(res => {
                    const data = res["payload"];
                    return data;
                })
            );
    }

    getOffer(page = 0, offerPerPage = 8): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.myNewOffers}?state=active&page=${page}&size=${offerPerPage}&sort=OfferType`;
        return this.httpClient.get(url)
            .pipe(
                map(res => {
                    const data = res["payload"];
                    return data;
                })
            );
    }

    addFavouriteDeal(dealRefId: string, actionType: string = 'add') {
        let requestURL = '';
        if (actionType === 'add') {
            requestURL = `${environment.serverUrl}${configUrls.addDealToFavourite}`;
            requestURL = requestURL.replace('{dealId}', dealRefId);
            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });
            return this.httpClient.post(requestURL, { dealRefNo: dealRefId }, { headers, observe: 'response' });
        } else {
            requestURL = `${environment.serverUrl}${configUrls.removeDealToFavourite}`;
            requestURL = requestURL.replace('{dealId}', dealRefId);
            return this.httpClient.delete(requestURL);
        }
    }

    getAllFavouriteDeal(page: number, size: number = 10) {
        const queryParams = `?page=${page}&size=${size}`;
        const requestURL = `${environment.serverUrl}${configUrls.getAllFavouriteDeal}${queryParams}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getDealDetailsMock(dealId: string) {
        return of({
            "success": true,
            "code": 200,
            "message": null,
            "payload": [
                {
                    "dealRefId": "3d5d8cee-0dfe-49b6-b2a3-37502e1cbf1a",
                    "sender": {
                        "name": "Soumyadip Hazra",
                        "id": "JKvaPJ6z2kOCucNGBmaPKXngWTu2",
                        "imageUrl": "https://storage.googleapis.com/gintaa-alpha/users/JKvaPJ6z2kOCucNGBmaPKXngWTu2/avatar/ac1310a13b5d4091a7fccdfdd9591d1d.jpg"
                    },
                    "receiver": {
                        "name": "Souvik Das",
                        "id": "8Kly0jLEF2h814u3LhE0yszYWN22",
                        "imageUrl": "https://storage.googleapis.com/gintaa-alpha/users/8Kly0jLEF2h814u3LhE0yszYWN22/avatar/eb73aaff20434ea0ba5784e6d111d821.png"
                    },
                    "performedBy": {
                        "name": "Soumyadip Hazra",
                        "id": "JKvaPJ6z2kOCucNGBmaPKXngWTu2",
                        "imageUrl": "https://storage.googleapis.com/gintaa-alpha/users/JKvaPJ6z2kOCucNGBmaPKXngWTu2/avatar/ac1310a13b5d4091a7fccdfdd9591d1d.jpg"
                    },
                    "dealSentTimeStamp": "2021-02-11T11:04:27",
                    "dealStatus": {
                        "dealStatus": "INITIATED",
                        "dealStatusDesc": "Initiated desc"
                    },
                    "requestedOffers": [
                        {
                            "offerId": "1612519145228",
                            "offerName": "Hi-Tech 21L Professional OTG Oven Toaster Grill",
                            "offerType": "Item",
                            "offerCount": 1,
                            "images": [
                                {
                                    "id": "2c8cb9f8-61ec-4d95-bb65-622572422612",
                                    "name": "1612519145533.jpeg",
                                    "orgName": "oven1.jpeg",
                                    "url": "https://storage.googleapis.com/gintaa-alpha/I/eedb055c-62f6-4394-ad54-43f47a13f315/2021/2/5/1612519145228//1612519145533.jpeg",
                                    "displayIndex": ""
                                },
                                {
                                    "id": "0257667b-6832-4b1b-aea3-056ae6553547",
                                    "name": "1612519146079.jpg",
                                    "orgName": "oven2.jpg",
                                    "url": "https://storage.googleapis.com/gintaa-alpha/I/eedb055c-62f6-4394-ad54-43f47a13f315/2021/2/5/1612519145228//1612519146079.jpg",
                                    "displayIndex": ""
                                }
                            ]
                        }
                    ],
                    "offeredOffers": [
                    ],
                    "callerIsReceiver": false,
                    "expiryDatetime": "2022-01-01T00:00:00",
                    "amountCurrency": "INR",
                    "requestedAmount": 12000,
                    "includeInsurance": true,
                    "dealDeliveryMethod": {
                        "id": "Self",
                        "name": "Own Arrangement",
                        "description": "Own Arrangement"
                    },
                    "junctionView": null,
                    "comments": "I can give at most 12500",
                    "dealValue": 12000,
                    "meetingDate": null,
                    "meetingStartTime": null,
                    "meetingEndTime": null,
                    "questions": [
                    ]
                }
            ]
        });
    }

    fetchThirdPartyData() {
        const requestURL: string = `../../../assets/mock/mock-third-party.json`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get<Response>(requestURL, { headers })
            .pipe(
                map(res => res.payload || null),
                catchError(error => of(error))
            );
    }

    fetchThirdPartyVendor(query: string = '') {
        const requestURL = `${environment.serverUrl}${configUrls.shippingCourier}?${query}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    fetchThirdPartyDataShow() {
        const requestURL: string = `../../../assets/mock/mock-third-party.json`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get<Response>(requestURL, { headers })
            .pipe(
                map(res => res.payload || null),
                catchError(error => of(error))
            );
    }


    getInsuranceVendors(): Observable<Insurance> {
        const requestURL: string = `../../../assets/mock/mock-insurance.json`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get<Response>(requestURL, { headers })
            .pipe(
                map(res => res.payload.insuranceVendors || null),
                catchError(error => of(error))
            );
    }

    getOfferByIds(offerIdsArr: any) {
        const offerIds = offerIdsArr.map((val) => val.offerId);
        const offerQuery = encodeURI(offerIds.join('|'));
        const queryParams = `?oids=${offerQuery}`;
        const requestURL = `${environment.serverUrl}${configUrls.offerByIds}${queryParams}`;
        return this.httpClient.get(requestURL).pipe(
            map(res => {
                const response = res["payload"];
                const data = offerIdsArr.map((val) => {
                    return response[val.offerId]
                })
                return data.filter((val) => val?.offerId);
            }),
            catchError(error => of(error))
        );
    }

    getDealQnAList(status: string = 'ACCEPTED') {
        const requestURL = `${environment.serverUrl}${configUrls.dealQuestionsUrl}?status=${status}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getDealCatList() {
        const requestURL = `${environment.serverUrl}${configUrls.dealCategoryUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    abandonReportDeal(requestBody: any, closetype: string = 'ABANDON') {
        let requestURL = '';
        if (closetype == 'ABANDON') {
            requestURL = `${environment.serverUrl}${configUrls.abandonDealUrl}`;
        } else {
            requestURL = `${environment.serverUrl}${configUrls.reportDealUrl}`;
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(requestURL, requestBody, { headers, observe: 'response' });
    }

    getmatchData(offerId = '', matchCountMax = '') {
        let reqUrl = `${environment.serverUrl}${configUrls.searchMatchOffer}`;
        if (matchCountMax) {
            reqUrl = `${reqUrl}?offerId=${offerId}&matchCountMax=${matchCountMax}`
        }
        return this.httpClient.get(reqUrl);
    }

    getDealHistoryDelta(dealId: string) {
        const requestURL = `${environment.serverUrl}${configUrls.getDealRevisionDeltaIdUrl}/${dealId}?numberOfDeltas=20`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getUserOffer(offerId: string): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.getOfferById}`;
        url = url.replace('{offerId}', offerId);
        return this.httpClient.get(url)
            .pipe(
                map(res => {
                    const data = res["payload"];
                    return [data]
                }),
                catchError(error => of(error))
            );
    }

    buyOut(payload: any) {
        let requestURL = `${environment.serverUrl}${configUrls.buyOut}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post(requestURL, payload, { headers, observe: 'response' });
    }

    registerPayment(dealId: any) {
        let requestURL = `${environment.serverUrl}${configUrls.registerPayment}`;
        requestURL = requestURL.replace('{dealId}', dealId);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.put(requestURL, {}, { headers, observe: 'response' });
    }
}
