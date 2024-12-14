import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
// import { reqUrlConfigs } from './req.interceptor.config';
import { Router } from '@angular/router';
import { ApiLoaderService } from '../../shared/services/api-loader.service';
import { LoggerService, InterceptorLoggerObject } from '../services/logger.service';
import { StorageService } from '../services/storage.service';

export const reqUrlConfigs = {
    noTokens: [
        '/auth/sms-otp',
        '/auth/verify-otp',
        '/offers/v1/offers/all',
        '/offers/v1/offers/',
        '/users/v1/user/mobile/check/',
        '/users/v1/user/email/check/'
    ],
    searchUrls: [
        '/search-management/v1/search-history',
        'search-management/v1/search'
    ]
};

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
    apiRequests: HttpRequest<any>[] = [];
    loading: boolean = false;
    loggerObject: InterceptorLoggerObject;
    constructor(
        private router: Router,
        // private loggerService: LoggerService,
        private apiLoaderService: ApiLoaderService,
        private storageService: StorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.apiLoaderService.isLoading.next(true);

        this.loggerObject = {
            logType: 'log',
            url: request.url,
            headers: request.headers,
            params: request.params,
            method: request.method,
            requestObject: request.body,
            startTimeStamp: new Date().getTime(),
        };
        return from(this.handleAccess(request, next));
    }

    async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const currentUser = this.storageService.store
        const token = this.storageService.store && this.storageService.store.accessToken;
        if (currentUser && currentUser.providerData)
            this.loggerObject.currentUser = currentUser.providerData[0].displayName || currentUser.providerData[0].phoneNumber || currentUser.providerData[0].email;
        let isTokenRequired: boolean = !reqUrlConfigs.noTokens.includes(request.url);
        if (isTokenRequired && (request.url.indexOf('siblings') > -1)) {
            isTokenRequired = false;
        }
        this.loggerObject.isTokenRequired = isTokenRequired;
        request = request.clone({ withCredentials: true });
        if (token && isTokenRequired) {
            /****
             * DATE: 15/04/21
             * SDH: replaced old 'X-Authorization-Firebase' header with Bearer
             * headers: request.headers.append('X-Authorization-Firebase', `${token}`)
             */
            request = request.clone({
                headers: request.headers.append('Authorization', `Bearer ${token}`)
            });
            this.loggerObject.headers = request.headers;
        }

        //////// Start Add businessId in header //////////
        let selectedBusinessId: any = this.storageService.getSelectedBusiness();
        if (selectedBusinessId) {
            request = request.clone({
                headers: request.headers.append('businessid', selectedBusinessId.businessId)
            });
            this.loggerObject.headers = request.headers;
        }
        //////// End Add businessId in header ///////////


        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.removeRequest(request);
                }
                if (event instanceof HttpResponse) {
                    this.loggerObject.logType = 'log';
                    this.loggerObject.responseObject = event;
                    this.loggerObject.endTimeStamp = new Date().getTime();
                    // this.loggerService.interceptLogger(this.loggerObject);
                }
                return event;
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                this.removeRequest(request);
                if (errorResponse instanceof HttpErrorResponse) {
                    // save error reference
                    this.loggerObject.logType = 'error';
                    this.loggerObject.responseObject = errorResponse;
                    this.loggerObject.endTimeStamp = new Date().getTime();
                    // this.loggerService.interceptLogger(this.loggerObject);
                    if (errorResponse.status === 403) {
                        if (errorResponse.error?.code == 403 && !errorResponse.error?.success) {
                            return throwError(errorResponse.error);
                        } else {
                            return throwError({ message: 'Access is denied', code: 403, success: false });
                        }
                    }
                    if (errorResponse.status >= 500) {
                        return throwError({ ...errorResponse.error, message: 'Your request cannot be processed now due to some technical issue. Please try again later.' });
                    } else {
                        if (errorResponse.error?.code && !errorResponse.error.success && errorResponse.error.code == 403) {
                            // this.firebaseAuthService.signOut();
                            // this.router.navigate(['/login']);
                            return throwError(errorResponse.error);
                        }
                    }
                }
                return throwError(errorResponse);
            }),
            finalize(() => {
                this.apiLoaderService.isLoading.next(false);
            })
        ).toPromise();
    }

    removeRequest(req: HttpRequest<any>) {
        const i = this.apiRequests.indexOf(req);
        if (i >= 0) {
            this.apiRequests.splice(i, 1);
        }
        // this.apiLoaderService.isLoading.next(this.apiRequests.length > 0);
    }
}
