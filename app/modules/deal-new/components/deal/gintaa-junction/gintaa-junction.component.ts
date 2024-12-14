import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import Moment from 'moment';
import { Subscription } from 'rxjs';
import { LocationService } from '@gintaa/core/services/location.service';
import { CurrentLocation } from '@gintaa/shared/models';
import { AGMMapMarker, GintaaJunction } from '@gintaa/modules/deal-new/models/deal.model';
import { selectDealState, selectReceiverAllOffers } from '@gintaa/modules/deal-new/store/deal.selectors';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';
@Component({
  selector: 'app-gintaa-junction',
  templateUrl: './gintaa-junction.component.html',
  styleUrls: ['./gintaa-junction.component.scss'],
  animations: [slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class GintaaJunctionComponent implements OnInit {

  showLoader: boolean = false;
  initialMeetingDate: any;
  initialMeetingTime: any = new Date();
  minimumDate: any;
  mapMarkers: AGMMapMarker[] = [];
  initialMeetingTimeDate: any;
  gintaJunctions: any[] = [];
  currentLocation: CurrentLocation = {
    available: false,
    _lat: '',
    _lng: '',
  };
  selectedJunctionDetails: GintaaJunction;
  selectedGintaaJunctionId: any;
  origin = { lat: 22.67, lng: 88.00 };
  destination: any = null;
  openedWindow: string;
  travelMode = 'DRIVING'; // BICYCLING, DRIVING, TRANSIT, WALKING
  showMapDirection = false;
  focusedMapCoords: any = null;
  kolkataCoords = { lat: 22.580311, lng: 88.3541618 };
  zoom = 8;
  setInitialJunction: boolean = true;
  selectedOffers: string = '';
  dealStateSubscriber: Subscription;
  offerSubscriber: Subscription;
  @Input() gintaaJunctionValidator: any;
  @Input() pageType: string;
  timeSelectionError: string = '';
  selectedDate: any = '';
  junctionDays: any = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  constructor(
    private store: Store<gintaaApp.AppState>,
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {
    this.dealStateSubscriber = this.store.select(selectDealState).subscribe((dealState: any) => {
      this.gintaJunctions = dealState.initiateDeal.allGintaaJunctions;
      this.selectedDate = dealState.initiateDeal.junctionMeetingDate;
      if (this.gintaJunctions && this.gintaJunctions.length > 0) {
        this.showMapDirection = true;
        this.gintaJunctions.forEach(junction => {
          this.mapMarkers.push({
            id: junction.id,
            lat: junction.latitude,
            lng: junction.longitude,
            name: junction.name,
            draggable: false,
            label: 'G',
          });
        });
        if (this.setInitialJunction) {
          this.setInitialJunction = false;
          if (this.pageType == 'suggest') {
            this.triggerSetSelectedJunction();
          } else {
            const selectedJunction = this.gintaJunctions.find((val) => val.id == dealState.initiateDeal.gintaaJunction?.id);
            if (selectedJunction) {
              this.setJunctionDetailsUpdate(selectedJunction);
              this.updateInitialMeetingDate(dealState.initiateDeal.junctionMeetingDate, dealState.initiateDeal.junctionMeetingTime, selectedJunction.junctionTimings);
            } else {
              this.triggerSetSelectedJunction();
            }
          }
        }
      }
    });
    this.offerSubscriber = this.store.select(selectReceiverAllOffers).subscribe((offerState: any) => {
      if (offerState && offerState.length > 0) {
        const selectedReceiverOffer = offerState.filter((offer) => offer.selectedOffer);
        if (selectedReceiverOffer) {
          const offerIds = selectedReceiverOffer.map((offer) => offer.offerId)
          this.selectedOffers = offerIds.join(',');
        }
      }
    });
    this.setCurrentUserLocation();
    const a = document.getElementById('gintaaTime');
    if (a) {
      a.classList.remove('mat-input-element');
    }
  }

  setCurrentUserLocation() {
    this.locationService.getPosition().then(res => {
      if (res.lat && res.lng) {
        this.currentLocation = {
          available: true,
          _lat: res.lat,
          _lng: res.lng,
        };
        this.origin = { lat: res.lat, lng: res.lng }
        this.getJintaaJunctions(this.currentLocation._lat, this.currentLocation._lng);
      }
    });
  }

  mapClicked($event: any) {
    this.origin = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
    };
    this.currentLocation = {
      available: true,
      _lat: $event.coords.lat,
      _lng: $event.coords.lng,
    };
    this.getJintaaJunctions(this.currentLocation._lat, this.currentLocation._lng);
  }

  getJintaaJunctions(lat: any, lng: any) {
    this.showLoader = true;
    this.store.dispatch(
      DealActions.fetchAllJunctions({
        destinationOfferId: this.selectedOffers,
        lat,
        lng
      })
    );
  }

  updateMeetingTime(meetingTime: string) {
    this.timeSelectionError = ''
    if (meetingTime) {
      const meetingDate = new Date(meetingTime);
      if (this.selectedJunctionDetails && this.selectedJunctionDetails?.id) {
        const day1 = this.selectedDate.getDay();
        if (this.selectedJunctionDetails?.junctionTimings && this.selectedJunctionDetails.junctionTimings[this.junctionDays[day1]]) {
          const today = this.selectedJunctionDetails.junctionTimings[this.junctionDays[day1]];
          const closeTime1 = today.closeTime ? this.formatJunctionOpenCloseTime(today.closeTime) : '';
          const openTime1 = today.openTime ? this.formatJunctionOpenCloseTime(today.openTime) : '';
          if (closeTime1 && openTime1) {
            const closeTime = closeTime1.split(':');
            const openTime = openTime1.split(':');
            if (closeTime && closeTime[0] && closeTime[1] && openTime && openTime[0] && openTime[1]) {
              const selectedTimeHours = meetingDate.getHours();
              const selectedTimeMin = meetingDate.getMinutes();
              let openTimeHrs = parseInt(openTime[0])
              let closeTimeHrs = parseInt(closeTime[0])
              if (openTime && openTime[2].indexOf('PM') !== -1) {
                openTimeHrs = openTimeHrs + 12;
              }
              if (closeTime && closeTime[2].indexOf('PM') !== -1) {
                closeTimeHrs = closeTimeHrs + 12;
              }
              if (selectedTimeHours >= openTimeHrs && (selectedTimeHours == openTimeHrs ? selectedTimeMin >= parseInt(openTime[1]) : true) && selectedTimeHours <= closeTimeHrs && (selectedTimeHours == closeTimeHrs ? selectedTimeMin <= parseInt(closeTime[1]) : true)) {
                this.store.dispatch(
                  DealActions.updateJunctionMeetingTime({
                    meetingTime
                  })
                )
                this.timeSelectionError = '';
              } else {
                this.timeSelectionError = 'Please select valid Junction time.';
                this.store.dispatch(
                  DealActions.updateJunctionMeetingTime({
                    meetingTime: ''
                  })
                )
              }
            } else {
              this.store.dispatch(
                DealActions.updateJunctionMeetingTime({
                  meetingTime
                })
              )
            }
          } else {
            this.store.dispatch(
              DealActions.updateJunctionMeetingTime({
                meetingTime
              })
            )
          }
        } else {
          this.store.dispatch(
            DealActions.updateJunctionMeetingTime({
              meetingTime
            })
          )
        }
      } else {
        this.timeSelectionError = 'Please select junction.';
        this.store.dispatch(
          DealActions.updateJunctionMeetingTime({
            meetingTime: ''
          })
        )
      }
    } else {
      this.store.dispatch(
        DealActions.updateJunctionMeetingTime({
          meetingTime: ''
        })
      )
    }
  }

  updateMeetingDate(event: any) {
    if (event.value) {
      const meetingDate = new Date(
        parseInt(Moment(event.value).format('YYYY'), 10),
        parseInt(Moment(event.value).format('MM'), 10) - 1,
        parseInt(Moment(event.value).format('DD'), 10),
        parseInt(Moment(event.value).format('hh'), 10),
        parseInt(Moment(event.value).format('mm'), 10),
        parseInt(Moment(event.value).format('ss'), 10),
      );

      const currentdate = new Date();
      if (meetingDate.getDate() === currentdate.getDate()) {
        this.initialMeetingTimeDate = currentdate;
      } else {
        this.initialMeetingTimeDate = new Date(
          currentdate.getFullYear(),
          parseInt((currentdate.getMonth()).toString().padStart(2, '0'), 10),
          currentdate.getDate(),
          9, 0, 0);
      }
      this.initialMeetingTime = '';
      this.store.dispatch(
        DealActions.updateJunctionMeetingDate({
          meetingDate
        })
      )
    }
  }

  updateInitialMeetingTime(opentime: string = '', closeTime: string = '') {
    let openHour = 9;
    let openMinute = 0;
    let closeHour = 22;
    let closeMinute = 0;
    if (opentime) {
      openHour = parseInt(opentime.split(':')[0], 10);
      openMinute = parseInt(opentime.split(':')[1], 10);
    }
    if (closeTime) {
      closeHour = parseInt(closeTime.split(':')[0], 10);
      closeMinute = parseInt(opentime.split(':')[1], 10);
    }
    const currentdate = this.selectedDate ? this.selectedDate : new Date();
    if (currentdate.getHours() < closeHour) {
      this.initialMeetingDate = new Date(
        currentdate.getFullYear(),
        parseInt((currentdate.getMonth()).toString().padStart(2, '0'), 10),
        currentdate.getDate(),
        openHour, openMinute, 0);
      if (openHour < currentdate.getHours()) {
        this.initialMeetingTime = new Date(
          currentdate.getFullYear(),
          parseInt((currentdate.getMonth()).toString().padStart(2, '0'), 10),
          currentdate.getDate(),
          currentdate.getHours(), (currentdate.getMinutes() + 5), 0);
      } else {
        this.initialMeetingTime = this.initialMeetingDate;
      }

    } else {
      this.initialMeetingDate = new Date(
        currentdate.getFullYear(),
        parseInt((currentdate.getMonth()).toString().padStart(2, '0'), 10),
        (currentdate.getDate() + 1),
        openHour, openMinute, 0);
      this.initialMeetingTime = new Date(
        currentdate.getFullYear(),
        parseInt((currentdate.getMonth()).toString().padStart(2, '0'), 10),
        currentdate.getDate(),
        openHour, openMinute, 0);
    }
    const currentdate2 = new Date();
    this.minimumDate = this.initialMeetingDate = new Date(
      currentdate.getFullYear(),
      parseInt((currentdate.getMonth()).toString().padStart(2, '0'), 10),
      (currentdate.getDate()),
      currentdate2.getHours(), (currentdate2.getMinutes() + 5), 0);
    this.initialMeetingTimeDate = currentdate;
    this.store.dispatch(
      DealActions.updateJunctionMeetingDate({
        meetingDate: this.initialMeetingDate
      })
    )
  }

  updateInitialMeetingDate(currentdate: any, junctionMeetingTime: any, junctionTimings: any) {
    let openHour = 9;
    let openMinute = 0;
    const day1 = currentdate.getDay();
    if (junctionTimings && junctionTimings[this.junctionDays[day1]]) {
      const openTime = junctionTimings[this.junctionDays[day1]]['openTime'];
      if (openTime) {
        openHour = parseInt(openTime.split(':')[0], 10);
        openMinute = parseInt(openTime.split(':')[1], 10);
      }
    }
    this.initialMeetingDate = new Date(
      currentdate.getFullYear(),
      parseInt((currentdate.getMonth()).toString().padStart(2, '0'), 10),
      currentdate.getDate(),
      openHour, openMinute, 0);

    if (junctionMeetingTime) {
      this.initialMeetingTime = junctionMeetingTime;
    }
  }

  triggerSetSelectedJunction() {
    if (this.gintaJunctions.length > 0) {
      this.setJunctionDetailsUpdate(this.gintaJunctions[0], true);
    }
  }

  setJunctionDetailsUpdate(junction: GintaaJunction, updateJunction = true) {
    this.selectedJunctionDetails = {
      ...junction,
      openTime: junction.openTime ? this.formatJunctionOpenCloseTime(junction.openTime) : '',
      closeTime: junction.closeTime ? this.formatJunctionOpenCloseTime(junction.closeTime) : '',
    };
    // show route for selected junction
    this.selectedGintaaJunctionId = junction.id;
    this.openedWindow = junction.id;
    this.destination = {
      lat: this.formatLatLng(junction.latitude),
      lng: this.formatLatLng(junction.longitude)
    };
    this.updateZoomLevel(junction.distance);
    if (updateJunction) {
      this.store.dispatch(
        DealActions.updateJunction({ gintaaJunction: this.selectedJunctionDetails })
      );
      this.updateInitialMeetingTime(this.selectedJunctionDetails.openTime, this.selectedJunctionDetails.closeTime);
    }
  }

  formatJunctionOpenCloseTime(junctionTime: string): string {
    // expecting in 24 hour format - 01:00:00
    let time = junctionTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [junctionTime];
    if (time.length > 1) {
      time = time.slice(1);
      time[4] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = String(+time[0] % 12 || 12);
    }
    return time.join('');
  }

  formatLatLng(pos: any) {
    return parseFloat(pos);
  }

  updateZoomLevel(distance: number) {
    // this is not a good solution
    // this approach is slower for performance as well -- avg 35ms
    let zoom = 8;
    switch (true) {
      case (distance <= 50):
        zoom = 3;
        break;

      case (distance <= 100):
        zoom = 4;
        break;

      case (distance <= 200):
        zoom = 5;
        break;

      case (distance <= 300):
        zoom = 7;
        break;

      case (distance <= 500):
        zoom = 8;
        break;

      case (distance > 500):
        zoom = 8;
        break;

      default:
        zoom = 8;
        break;
    }
  }

  getMapLat() {
    const lat = this.focusedMapCoords ? this.focusedMapCoords.lat : this.kolkataCoords.lat;
    return this.currentLocation ? this.currentLocation._lat : lat;
  }

  getMapLng() {
    const lng = this.focusedMapCoords ? this.focusedMapCoords.lng : this.kolkataCoords.lng;
    return this.currentLocation ? this.currentLocation._lng : lng;
  }

  getZoom() {
    return this.zoom;
  }

  isInfoWindowOpen(id: string) {
    if (!id) {
      return false;
    }
    return this.openedWindow === id;
  }

  ngOnDestroy() {
    try {
      this.dealStateSubscriber.unsubscribe();
      this.offerSubscriber.unsubscribe();
    } catch (e) {
    }
  }

}
