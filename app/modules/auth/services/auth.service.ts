import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient
      ) { }

    removeProfileImage(){
        const url: string = `${environment.serverUrl}${configUrls.uploadProfileImgUrl}`;
        return this.httpClient.delete(url)
    }
}
