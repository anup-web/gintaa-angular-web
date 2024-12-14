import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { CurrentLocation } from '@gintaa/modules/auth/models/auth.model';
import { LocationService } from '@gintaa/core/services/location.service';
import { PlacePredictionService } from '@gintaa/core/services/place-prediction.service';
import { GooglePlaceResult } from '@gintaa/core/models/google-place-result.model';
import { PlaceService } from '@gintaa/core/services/place.service';
import { AddressResponse } from '@gintaa/core/models';
import { GeocodingService } from '@gintaa/core/services/geocode.service';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';

@Component({
  selector: 'app-user-profile-location',
  templateUrl: './user-profile-location.component.html',
  styleUrls: ['./user-profile-location.component.scss']
})
export class UserProfileLocationComponent implements OnInit {

  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
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

  updateCurrentLocationMarker(location: CurrentLocation) {
    if (location) {
      this.store.dispatch(
        AuthActions.updateUserCurrentLocation({ location })
      );
    }
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
    return this.zoom;
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
    // console.log('clicked: ', this.focusedMapCoords);
    this.updateCurrentLocationMarker(this.focusedMapCoords);
    this.fetchAndUpdateFormattedAddress($event.coords.lat, $event.coords.lng);
  }

  fetchAndUpdateFormattedAddress(lat: string, lng: string) {
    // fetch the address from the latlong
    const latLng = new google.maps.LatLng(+lat, +lng);
    this.geoCodeService.geocode(latLng).subscribe((currentAddressResults: google.maps.GeocoderResult[]) => {
      const currentAddressResult = currentAddressResults[0];
      this.addressInput = new AddressResponse();
      this.addressInput.addressLine = currentAddressResult.formatted_address;
      this.extractPlaceDetails(currentAddressResult);
    });
  }

  onSearch(search: string) {
    if (search.length >= 3) {
      // console.log('[serach term]', search);
      setTimeout(() => {
        this.placePredictionService.getPlacePredictions(search)
        .subscribe(
          (response: GooglePlaceResult[]) => this.googlePlacesResults = response
        );
      }, 100);
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
    this.addressInput.annotation = 'Home';
 
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

    this.store.dispatch(
      AuthActions.updateUserAddress({ address: this.addressInput })
    );

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
