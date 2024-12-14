import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrls } from '@gintaa/config/api-urls.config';
import { environment } from '@gintaa/env';
import { Response } from '@gintaa/shared/models';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Vertical } from '../models/Category';
import { SearchSuggestion } from '../models/Search';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private httpClient: HttpClient) {}

      getAllVerticals(): Observable<Vertical[]> {
        const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}`;    
        return this.httpClient.get<Response>(url)
        .pipe(
          map(res => res.payload ? res.payload : []),
          shareReplay()
        );
      }

      getSearchHistory(): Observable<Response> {
        const url: string = `${environment.serverUrl}${configUrls.searchHistory}`;    
        return this.httpClient.get<Response>(url);
      }

      deleteSearchHistory(): Observable<SearchSuggestion[]> {
        const url: string = `${environment.serverUrl}${configUrls.deleteSearchHistory}`;    
        return this.httpClient.delete<Response>(url)
        .pipe(
          map(response => response.payload || [])
        );
      }
    
      getSuggestion(text: string): Observable<Response> {
        let searchParams: HttpParams = new HttpParams();
        searchParams = searchParams.append('text', text)
        const url: string = `${environment.serverUrl}${configUrls.suggestion}`;
        if(text) {
          return this.httpClient.get<Response>(url, {
            params: searchParams
          })
        }
        return this.httpClient.get<Response>(url);
      }
    
      getSearchFullText(params?: string): Observable<Response> {
        //let url = '../../../assets/mock/mock-search.json'
        let url: string = `${environment.serverUrl}${configUrls.searchFullText}`;
        if(params) {
          url = `${url}${params}`;
        }
        return this.httpClient.get<Response>(url);
      }
}