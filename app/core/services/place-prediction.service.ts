import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { } from 'googlemaps';
import { GooglePlaceResult } from '@gintaa/core/models/google-place-result.model';

@Injectable()
export class PlacePredictionService {
    public autocompleteService;
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private mapsAPILoader: MapsAPILoader) {
        if (isPlatformBrowser(this.platformId)) {
            this.mapsAPILoader.load().then(() => {
                this.autocompleteService = new google.maps.places.AutocompleteService();
            });
        }

    }

    getPlacePredictions(term: string): Observable<any[]> {
        return Observable.create(observer => {
            // see below link for map developer API
            // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
            const request = {
                input: term,
                componentRestrictions: { country: 'in' },
                types: ['geocode']
            };

            this.autocompleteService.getPlacePredictions(request, (data: GooglePlaceResult[]) => {
                if (data) {
                    observer.next(data);
                    observer.complete();
                } else {
                    observer.error(status);
                }
            });
        });
    }
}
