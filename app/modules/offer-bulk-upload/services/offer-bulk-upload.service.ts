import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';
import { LoggerService } from '@gintaa/core/services/logger.service';

@Injectable({
    providedIn: 'root'
})
export class OfferBulkUploadService {
    constructor(
        private http: HttpClient,
        private logger: LoggerService
    ) {}

    bulkUploadOffer(offers: any) {
        return of({
            success: true,
            message: 'Fetch Successfull',
            status: 200,
            payload: [
                {
                    businessId: '1',
                    logo: 'assets/images/business/company-logo.svg',
                    name: 'ABCDinfotech',
                    color: '#6b9c2e',
                    status: 'Under review',
                    activated: false
                }
            ]
        }).pipe(delay(1000));
    }

    bulkUploadOfferMock(offers: any) {
        const url = '../../../../assets/mock/mock-offer-bulk-upload.json';
        return this.http.get(url).pipe(delay(2000));
    }

}
