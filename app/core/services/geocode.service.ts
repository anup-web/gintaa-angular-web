import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { } from 'googlemaps';
import { Observable, Observer } from 'rxjs';

/**
 * GeocodingService class.
 */
@Injectable() export class GeocodingService {

    public geocoder;

    constructor(private mapsAPILoader: MapsAPILoader, @Inject(PLATFORM_ID) private platformId) {
        if(isPlatformBrowser(this.platformId)) {
            this.mapsAPILoader.load().then(() => {
                this.geocoder = new google.maps.Geocoder();
            });
        }        
    }

    /**
     * Reverse geocoding by location.
     *
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param latLng Location
     * @return An observable of GeocoderResult
     */
    geocode(latLng: any): Observable<google.maps.GeocoderResult[]> {
        return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ location: latLng }, (
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results);
                        observer.complete();
                    } else {
                        observer.error(status);
                    }
                })
            );
        });
    }

    /**
     * Geocoding service.
     *
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param address The address to be searched
     * @return An observable of GeocoderResult
     */
    codeAddress(address: string): Observable<google.maps.GeocoderResult[]> {
        return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ address }, (
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results);
                        observer.complete();
                    } else {
                        observer.error(status);
                    }
                })
            );
        });
    }
}
