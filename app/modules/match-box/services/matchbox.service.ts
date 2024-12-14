import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';
import { LoggerService } from '@gintaa/core/services/logger.service';
import { MatchBoxAvailableTabs } from '@gintaa/modules/match-box/models/matchbox.model';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MatchBoxService {

    constructor(
        private httpClient: HttpClient,
        private logger: LoggerService) { }

    getmatchData(input: string, matchType: MatchBoxAvailableTabs, matchCountMax=''): Observable<any[]> {
        
        let reqUrl = `${environment.serverUrl}`;
        if(matchType === 'existing'){
            reqUrl= reqUrl + `${configUrls.searchMatchUser}`;
            if(matchCountMax){
                reqUrl = `${reqUrl}?matchCountMax=${matchCountMax}`
            }
        } else{
            reqUrl = reqUrl + `${configUrls.searchMatchFullText}?desire=${input}`;
            if(matchCountMax){
                reqUrl = `${reqUrl}&matchCountMax=${matchCountMax}`
            }
        }
        
        return this.httpClient.get(reqUrl)
        .pipe(
            map(res => {
                if(matchType === 'existing'){
                    return (res['payload'] && Array.isArray(res['payload'])) ? res['payload'] : [];
                } else {
                    return (res['payload'] && res['payload']['hits'] && Array.isArray(res['payload']['hits'])) ? res['payload'] : {hits:[], matchCount:0};
                }
            }, err => {
                return throwError(err)
            })
        );
    }
}
