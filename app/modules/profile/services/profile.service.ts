import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from '@gintaa/modules/deal-new/models/deal.model';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';
import { I } from "@angular/cdk/keycodes";
// import { LoggerService } from '@gintaa/core/services/logger.service';
@Injectable({
    providedIn: 'root'
})

export class ProfileService {

    private subject = new Subject<any>()

    constructor(
        private httpClient: HttpClient,
        // private logger: LoggerService,
    ) { }

    getUserOffer(userId: string , businessId: string = null): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.loggedInUserPublishedOffers}/${userId}`;
        if(businessId) {
            url += '?businessId=' + businessId;
        }
        return this.httpClient.get(url)
            .pipe(
                map(res => {
                    return res["payload"] ? res["payload"] : [];
                })
            );
    }

    getUserFeedback(queryString: string, userId: string): Observable<any[]> {
        const url: string = `${environment.serverUrl}${configUrls.otherProfileUserFeedback}${userId}`;
        return this.httpClient.get(url)
            .pipe(
                map(res => {
                    return res["payload"] ? res["payload"] : [];
                })
            );
    }

    removeProfileImage() {
        const url: string = `${environment.serverUrl}${configUrls.uploadProfileImgUrl}`;
        return this.httpClient.delete(url)
    }

    sendOtherUserAllOffer(list: any) {
        this.subject.next({ list: list });
    }

    getOtherUserAllOffer(): Observable<any> {

        // console.log("=====get all user Data",)
        return this.subject.asObservable();
    }
    
    getReportCategories(){
        const url: string = `${environment.serverUrl}${configUrls.getReportCategories}`;
        return this.httpClient.get(url);
    }

    blockUserProfile(input){
        const url: string = `${environment.serverUrl}${configUrls.blockUserProfile}`;
        return this.httpClient.post(url, input)
            .pipe(
                map(res => {
                    return res["payload"] ? res["payload"] : [];
                })
            );
    }

    unBlockUserProfile(userId: string){
        const url: string = `${environment.serverUrl}${configUrls.unBlockUserProfile}${userId}`;
        return this.httpClient.delete(url);
    }

    checkAlreadyCallerHasBlockedUser(userId: string){
        const url: string = `${environment.serverUrl}${configUrls.checkAlreadyCallerHasBlockedUser}${userId}`;
        return this.httpClient.get(url);
    }

    checkAlreadyCallerIsBlockedByUser(userId: string){
        const url: string = `${environment.serverUrl}${configUrls.checkAlreadyCallerIsBlockedByUser}${userId}`;
        return this.httpClient.get(url);
    }

    checkAlreadyBlockByEachOther(userId: string){
        const url: string = `${environment.serverUrl}${configUrls.checkAlreadyBlockByEachOther}${userId}`;
        return this.httpClient.get(url);
    }

    checkAlreadyCallerHasReportedUser(userId: string){
        const url: string = `${environment.serverUrl}${configUrls.checkAlreadyCallerHasReportedUser}${userId}`;
        return this.httpClient.get(url);
    }

}
