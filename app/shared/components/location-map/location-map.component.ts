import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';

import { LocationService } from '@gintaa/core/services/location.service';
import { PlacePredictionService } from '@gintaa/core/services/place-prediction.service';
import { PlaceService } from '@gintaa/core/services/place.service';
import { GeocodingService } from '@gintaa/core/services/geocode.service';

import { GooglePlaceResult } from '@gintaa/core/models/google-place-result.model';
import { AddressResponse } from '@gintaa/core/models';
import { CurrentLocation } from '@gintaa/shared/models/shared.model';

import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit {

  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  @Input() stateModule: string;
  @Input() actionMode: string;
  @Input() address: any;
  @Input() addressAnnotations: string[] = [];
  intervalCounter: number = 0;
  // addressTitle is the secondary address title at the bottom (used in business)
  // functionality has been removed from here
  @Input() addressTitle: { name: string, value: string } = null;
  @Output("setMapAddress") setMapAddress: EventEmitter<any> = new EventEmitter();

  kolkataCoords = { _lat: 22.580311, _lng: 88.3541618 };
  zoom = 8;
  focusedMapCoords: any = null;
  currentLocation: CurrentLocation = {
    available: false,
    _lat: null,
    _lng: null,
  };
  googlePlacesResults: GooglePlaceResult[];
  addressInput: AddressResponse;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private locationService: LocationService,
    private placePredictionService: PlacePredictionService,
    private placeService: PlaceService,
    private geoCodeService: GeocodingService,
  ) { }

  ngOnInit(): void {
    // default state module is always auth if not provided
    if (!this.stateModule) {
      this.stateModule = 'auth';
    }

    if(this.actionMode === 'edit') {
      
      this.currentLocation = {
        _lat: this.address.lat,
        _lng: this.address.lng,
        available: true,
      };
      setTimeout(() => {
       this.fetchAndUpdateFormattedAddress(this.currentLocation._lat, this.currentLocation._lng, 'edit');
      }, 100);
    }
  }

  fetchCurrentLocation() {
    this.locationService.getPosition().then(res => {
      if (res.lat && res.lng) {
        this.currentLocation = {
          available: true,
          _lat: res.lat,
          _lng: res.lng,
        };
        this.fetchAndUpdateFormattedAddress(res.lat, res.lng);
      }
    });
  }

  getMapLat() {
    const lat = this.focusedMapCoords ? this.focusedMapCoords._lat : this.kolkataCoords._lat;
    return this.currentLocation.available ? +this.currentLocation._lat : lat;
  }

  getMapLng() {
    const lng = this.focusedMapCoords ? this.focusedMapCoords._lng : this.kolkataCoords._lng;
    return this.currentLocation.available ? +this.currentLocation._lng : lng;
  }

  getZoom() {
    return this.zoom + 6;
  }

  getMapMarkerLat() {
    if (this.focusedMapCoords) {
      return this.focusedMapCoords._lat;
    } else {
      return this.currentLocation.available ? this.currentLocation._lat : this.kolkataCoords._lat;
    }
  }

  getMapMarkerLng() {
    if (this.focusedMapCoords) {
      return this.focusedMapCoords._lng;
    } else {
      return this.currentLocation.available ? this.currentLocation._lng : this.kolkataCoords._lng;
    }
  }

  mapClicked($event: any) {
    this.focusedMapCoords = {
      _lat: $event.coords.lat,
      _lng: $event.coords.lng,
      available: true,
    };

    this.updateCurrentLocationMarker(this.focusedMapCoords);
    this.fetchAndUpdateFormattedAddress($event.coords.lat, $event.coords.lng);
  }

  updateCurrentLocationMarker(location: CurrentLocation) {
    if (location) {
      // check the current stateModule
      if (this.stateModule === 'profile') {
        this.store.dispatch(
          ProfileActions.updateUserCurrentLocation({ location })
        );
      } else if (this.stateModule === 'create-offer') {
        CreateOfferActions.updateUserCurrentLocation({ location })
      } else if (this.stateModule === 'business') {
        this.store.dispatch(
          BusinessActions.updateCurrentLocation({ location })
        );
        // console.log('business location:', location);
      } else if (this.stateModule === 'new-address') {
        this.setMapAddress.emit({location:this.currentLocation,address:this.addressInput});
      } else {
        this.store.dispatch(
          AuthActions.updateUserCurrentLocation({ location })
        );
      }
    }
  }

  fetchAndUpdateFormattedAddress(lat: string, lng: string, mode: string = 'add') {
    try{
      const latLng = new google.maps.LatLng(+lat, +lng);
      this.geoCodeService.geocode(latLng).subscribe((currentAddressResults: google.maps.GeocoderResult[]) => {
        const currentAddressResult = currentAddressResults[0];
        this.addressInput = new AddressResponse();
        this.addressInput.addressLine = currentAddressResult.formatted_address;
        if(mode === 'edit') {
          this.store.dispatch(
            ProfileActions.updateUserAddress({ address: this.address })
          );
          this.searchElementRef.nativeElement.value = currentAddressResult.formatted_address;
          this.focusedMapCoords = { ...this.currentLocation };
          this.updateCurrentLocationMarker(this.currentLocation);
        } else{
          this.extractPlaceDetails(currentAddressResult);
        }
      });
    } catch(err){
      this.intervalCounter++;
      if(this.intervalCounter < 5){
        setTimeout(() => {
          this.fetchAndUpdateFormattedAddress(lat, lng, mode);
        }, 100);
      }
    }
    
  }

  onSearch(search: string) {
    if (search.length >= 3) {
      setTimeout(() => {
        this.placePredictionService.getPlacePredictions(search)
        .subscribe(
          (response: GooglePlaceResult[]) => this.googlePlacesResults = response
        );
      }, 100);
    } else if(!search.length){
      // console.log("Empty search");
      if (this.stateModule === 'business') {    
        // console.log('stateModule:', this.stateModule);
        this.setMapAddress.emit({location:null, address: null});
      }


    }
  }

  suggestionSelected(prediction: GooglePlaceResult) {
    this.searchElementRef.nativeElement.value = prediction.description;
    // todo
    this.addressInput = new AddressResponse();
    this.addressInput.addressLine = prediction.description;
    this.placeService.getPlaceDetails(prediction.place_id)
    .subscribe(
      (placeDetails: google.maps.places.PlaceResult) => {
        this.extractPlaceDetails(placeDetails);
      }
    );
  }

  extractPlaceDetails(place: any) {
    this.googlePlacesResults = [];
    this.addressInput = new AddressResponse();
    const currentAddress: any = this.placeService.extractPlaceDetailsNew(place);
    this.addressInput = {...currentAddress}
    
    if (this.addressAnnotations.length) {
      this.addressInput.annotation = this.addressAnnotations[0];
    } else {
      this.addressInput.annotation = 'Home';
    }

    if (!this.addressInput.city) {
      this.addressInput.city = 'NA';
    }
    if (!this.addressInput.area) {
      this.addressInput.area = 'NA';
    }
    if (!this.addressInput.flatNo) {
      this.addressInput.flatNo = 'NA';
    }
    if (!this.addressInput.zip) {
      this.addressInput.zip = '700000';
    }
    if (!this.addressInput.landmark) {
      this.addressInput.landmark = 'NA';
    }

    if (this.stateModule === 'profile') {
      this.store.dispatch(
        ProfileActions.updateUserAddress({ address: this.addressInput })
      );
    } else if (this.stateModule === 'create-offer') {
      this.store.dispatch(
        CreateOfferActions.updateUserAddress({ address: this.addressInput })
      );
    } else if (this.stateModule === 'business') {
      this.store.dispatch(
        BusinessActions.updateBusinessAddress({ address: this.addressInput })
      );
    }  else if (this.stateModule === 'new-address') {
      this.setMapAddress.emit({location:this.currentLocation,address:this.addressInput});
    } else {
      this.store.dispatch(
        AuthActions.updateUserAddress({ address: this.addressInput })
      );
    }

    this.searchElementRef.nativeElement.value = place.formatted_address;

    // finally updating the marker
    this.currentLocation = {
      available: true,
      _lat: String(this.addressInput.lat),
      _lng: String(this.addressInput.lng),
    };

    this.focusedMapCoords = {
      ...this.currentLocation
    };
    this.updateCurrentLocationMarker(this.currentLocation);
  }

}
