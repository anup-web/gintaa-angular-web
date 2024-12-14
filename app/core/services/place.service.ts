import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { } from 'googlemaps';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { LocationService } from './location.service';
import { GeocodingService } from './geocode.service';
import { CookieService } from './cookie.service';
import { DeviceService } from './device.service';

interface Address {
  city: string;
  state: string;
  country: string;
}

@Injectable()
export class PlaceService {

  // private currentAddr: Subject<Address> = new Subject<Address>();
  // currentAddr$: Observable<Address> = this.currentAddr.asObservable();
  POSITION_LAT_LNG = '22.5754,88.4798';
  private currentCitySub: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  currentCity$: Observable<string> = this.currentCitySub.asObservable();
  placeService: any;
  currentLocationLatLong: string = this.POSITION_LAT_LNG;
  private city: string = null;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private locationService: LocationService,
    private geoCodeService: GeocodingService,
    private cookieService: CookieService,
    private deviceService: DeviceService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {
        this.placeService = new google.maps.places.PlacesService(document.createElement('div'));
        this.setCurrentLocation();
      });
    }
  }

  // Wrapper for Google Places Autocomplete Prediction API, returns observable
  getPlaceDetails(placeId: string): Observable<google.maps.places.PlaceResult> {
    return Observable.create(observer => {
      this.placeService.getDetails({ placeId }, (data: google.maps.places.PlaceResult) => {
        if (data) {
          observer.next(data);
          observer.complete();
        } else {
          observer.error(status);
        }
      });
    });
  }

  setCurrentLocation() {
    from(this.locationService.getPosition()).
      subscribe(
        (position) => {
          // console.log('position json:::', position);
          this.currentLocationLatLong = `${position.lat},${position.lng}`;
          this.cookieService.set("_lat", this.getCookie('search-lat'), 10, null, '.gintaa.com', null, null);
          this.cookieService.set("_lng", this.getCookie('search-lng'), 10, null, '.gintaa.com', null, null);
          const latLng = new google.maps.LatLng(position.lat, position.lng);
          this.geoCodeService.geocode(latLng)
            .subscribe(
              (currentAddressResults: google.maps.GeocoderResult[]) => {
                const currentAddressResult = currentAddressResults[0];
                this.extractPlaceDetails(currentAddressResult);
              },
              (error: any) => {
                this.currentLocationLatLong = this.POSITION_LAT_LNG;
                this.cookieService.set("_lat", this.getCookie('search-lat'), 10, null, '.gintaa.com', null, null);
                this.cookieService.set("_lng", this.getCookie('search-lng'), 10, null, '.gintaa.com', null, null);
              }
            );
        }
      );
  }

  extractPlaceDetails(place: any) {
    const userAddress = {} as Address;
    place.address_components.forEach(addComp => {
      const types: any[] = addComp.types;
      types.forEach(type => {
        if (type === 'country') {
          userAddress.country = addComp.long_name;
        }
        if (type === 'administrative_area_level_1') {
          userAddress.state = addComp.long_name;
        }
        if (type === 'locality') {
          userAddress.city = addComp.long_name;
        }
      });
    });
    // console.log('Current Address Now:::', userAddress);
    //this.currentAddr.next(userAddress);
    this.selectedCity(userAddress.city);
  }

  getCookie(identity: string): string {
    let searchDetails = null;
    switch (identity) {
      case "history":
        searchDetails = this.deviceService.deviceId;
        break;
      case "search-lat":
        searchDetails = this.currentPlaceLatLong.split(',')[0];
        break;
      case "search-lng":
        searchDetails = this.currentPlaceLatLong.split(',')[1];
        break;
      default:
        searchDetails = "";
    }
    return searchDetails;
  }

  get currentPlaceLatLong() {
    return this.currentLocationLatLong;
  }

  selectedCity(city: string) {
    this.city = city;
    this.currentCitySub.next(this.city);
  }

  get currentCity(): string {
    return this.city;
  }


  extractPlaceDetailsNew(place: any) {
    let currentAddress: any = {};
    currentAddress.addressLine = place.formatted_address;
    currentAddress.lat = place.geometry.location.lat();
    currentAddress.lng = place.geometry.location.lng();
    place.address_components.forEach(addComp => {
      const types: any[] = addComp.types;
      types.forEach(type => {
        if (type === 'country') {
          currentAddress.country = addComp.long_name;
        }
        if (type === 'postal_code') {
          currentAddress.zip = addComp.long_name;
        }
        if (type === 'administrative_area_level_1') {
          currentAddress.state = addComp.long_name;
        }
        if (type === 'locality') {
          currentAddress.city = addComp.long_name;
        }
        if (type === 'premise') {
          currentAddress.flatNo = addComp.long_name;
        }
        if (!currentAddress.city) {
          if (!currentAddress.area) {
            if (type === 'sublocality_level_1' || type === 'sublocality_level_2' || type === 'administrative_area_level_2') {
              currentAddress.area = addComp.long_name;
            }
          }
          if (type === 'sublocality') {
            currentAddress.landmark = addComp.long_name;
          }
        }
      });
    });
    return currentAddress
  }
}
