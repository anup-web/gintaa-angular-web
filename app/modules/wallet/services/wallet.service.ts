import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Response } from "@gintaa/shared/models";

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    rewards: Subject<any> = new Subject<any>();
    rewards$: Observable<any> = this.rewards.asObservable();
    // updateOffers: Subject<any> = new Subject<any>();
    // updateOffers$: Observable<any> = this.rewards.asObservable();

    constructor(private http:HttpClient) { }

    getWalletDetails(): Observable<Response> {
        let url = '../../../assets/mock/mock-wallet.json'
        //let url: string = `${environment.serverUrl}${configUrls.walletDetails}`;        
        return this.http.get<Response>(url);
    }

    getReferalLink(): Observable<Response> {
        let url = '../../../assets/mock/mock-wallet-referal.json'
        //let url: string = `${environment.serverUrl}${configUrls.walletDetails}`;        
        return this.http.get<Response>(url);
    }

    getRewards(): Observable<Response> {
        let url = '../../../assets/mock/mock-wallet-rewards.json'
        //let url: string = `${environment.serverUrl}${configUrls.walletDetails}`;        
        return this.http.get<Response>(url);
    }

    getOffers(): Observable<Response> {
        let url = '../../../assets/mock/mock-wallet-redeem.json'
        //let url: string = `${environment.serverUrl}${configUrls.walletDetails}`;        
        return this.http.get<Response>(url);
    }
}
