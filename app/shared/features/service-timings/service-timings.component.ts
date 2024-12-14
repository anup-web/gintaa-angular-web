import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { CreateOfferService } from '@gintaa/modules/create-offer/services/create-offer.service';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { AvailableDay, AvailableTime } from '@gintaa/modules/create-offer/store/models/user-offer-info';
import { selectOfferInfo } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { OfferTypes } from '@gintaa/modules/my-offers/configs/my-offer.enum';
import { Offer } from '@gintaa/shared/models/offer';
import { select, Store } from '@ngrx/store';
import availableDays from './default-service-timing-config';

const titleCase = string => string.charAt(0).toUpperCase() + string.charAt(1).toLowerCase();
@Component({
  selector: 'app-service-new-timings',
  templateUrl: './service-timings.component.html',
  styleUrls: ['./service-timings.component.scss']
})

export class ServiceTimingsNewComponent implements OnInit {
  public serviceTimingInfoForm: FormGroup;
  availableDays: AvailableDay[] = availableDays();
  minValue: any;
  offerCategory: string = null;
  offer: Offer;
  showTimeError: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private createOfferService: CreateOfferService
  ) { 
    this.serviceTimingInfoForm = this.fb.group({
      serviceTimingInfos: this.fb.array([]),
      timingInformationList: this.fb.array([]),
      serviceTimeSameForAllDays: false
    });
  }

  ngOnInit(): void {
    let currntUrl = this.router.url;
    if (currntUrl && currntUrl.includes('business')) {
      this.subscribeToBusinessFormValue();
    } else {
      this.subscribeToFormValue();
    }    
  }

  subscribeToFormValue() {
    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe((offer: Offer) => {
      this.offer = offer;
      if (this.serviceTimingInfoForm && offer.serviceTimingInfos) {
        if (offer.draftOfferId || (this.offerCategory.toUpperCase() === OfferTypes.Published.toUpperCase() && offer.offerId)) {
          this.days.clear();
        }
        this.serviceTimingInfoForm.get("serviceTimeSameForAllDays").patchValue(
          this.offer.serviceTimeSameForAllDays, { onlySelf: true});
        this.serviceTimingInfoForm.get("serviceTimeSameForAllDays").updateValueAndValidity();

        offer.serviceTimingInfos.forEach(selectedDay => {
          const index = this.availableDays.findIndex(day => day.dayOfWeek === selectedDay.dayOfWeek);
          this.availableDays[index].state = true;
          if (offer.draftOfferId || (
            this.offerCategory.toUpperCase() === OfferTypes.Published.toUpperCase() && offer.offerId
          )) {
            // needd to add the controls for service timings for draft offer
            this.updateSelectedTimePeriodsForDay(selectedDay);
          }
        })
        this.serviceTimingInfoForm.markAllAsTouched();
      }
    });
  }

  subscribeToBusinessFormValue() {
    this.store.pipe(
      select(selectBusinessState)
    ).subscribe((business) => {
      let currentBusinessDetails = { ...business.currentBusinessDetails };
      if (this.serviceTimingInfoForm && currentBusinessDetails.hoursOfOperations) {
      }
    });
  }

  get days(): FormArray {
    return this.serviceTimingInfoForm?.get("serviceTimingInfos") as FormArray;
  }

  get dayControl(): FormArray {
    return this.days?.controls[0].get("timingInfoList") as FormArray;
  }

  get isEnableServiceAvailability(): boolean {
    return this.serviceTimingInfoForm?.get("serviceTimeSameForAllDays")?.value;
  }

  get times(): FormArray {
    return this.serviceTimingInfoForm?.get("timingInformationList") as FormArray;
  } 

  createServiceTimings(day: AvailableDay): FormGroup {
    return this.fb.group({
      dayOfWeek: [day.dayOfWeek],
      prefix: day.prefix,
      state: day.state,
      timingInfoList: this.createTimingsOnDay(day)
    });
  }

  createTimingsOnDay(day: AvailableDay) {
    let arr = this.fb.array([]);
    day.timingInfoList.forEach((time) => {
      arr.push(
        this.createPathForTimingInfoLists(time)
      )
    })
    return arr;
  }

  createPathForTimingInfoLists(time: AvailableTime): FormGroup {
    const isClone: boolean = !this.isEnableServiceAvailability && !!this.days.length;
    if (isClone) {
      let timeObj: AvailableTime[] = this.days?.controls[0]?.get('timingInfoList').value;
      time.startTime = timeObj[0].startTime;
      time.endTime = timeObj[0].endTime;
    }
    return this.fb.group({
      startTime: [time.startTime],
      endTime: [time.endTime]
    })
  }

  updateSelectedTimePeriodsForDay(selectedDay: AvailableDay) {
    this.days.push(this.addDraftServiceAvailbility(selectedDay, this.days.length))
    this.days.updateValueAndValidity();
  }

  addDraftServiceAvailbility(day: any, isDayPresent: number) {
    if (this.isEnableServiceAvailability) {
      return this.fb.group({
        dayOfWeek: [day.dayOfWeek],
        prefix: day.prefix || titleCase(day.dayOfWeek.slice(0, 2)),
        state: day.state || true,
        timingInfoList: this.addNewDraftTimeControl(day.timingInfoList)
      });
    } else {
      return this.fb.group({
        dayOfWeek: [day.dayOfWeek],
        prefix: day.prefix || titleCase(day.dayOfWeek.slice(0, 2)),
        state: day.state || true,
        timingInfoList: isDayPresent ?
          day.timingInfoList : this.addNewDraftTimeControl(day.timingInfoList)
      });
    }
  }

  addNewDraftTimeControl(timingInfoLists) {
    let arr = this.fb.array([]);
    timingInfoLists.forEach(time => {
      arr.push(this.fb.group({
        startTime: this.formatDraftServiceTime(time.startTime),
        endTime: this.formatDraftServiceTime(time.endTime)
      }))
      // return arr;
    });
    return arr;
  }

  public formatDraftServiceTime(time): Date {
    if (isNaN(time) && isNaN(Date.parse(time))) {
      let date = new Date();
      const timeArr = time.split(":");
      date.setHours(timeArr[0]);
      date.setMinutes(timeArr[1]);
      date.setSeconds(timeArr[2]);
      return date;
    }
    return time;
  }

  updateTimePeriodsForDay(day: AvailableDay, index: number) {
    day.state = !day.state;
    if (this.isEnableServiceAvailability) {
      if (!day.state) {
        this.deleteDay(day, index);
      } else {
        this.addNewDays(day, index);
      }
    } else {
      if (!day.state) {
        this.deleteSelectedDay(day, index);
      } else {
        if (this.days?.length) {
          const selectedIndex: number = this.days.controls.findIndex(
            control => control?.get('dayOfWeek').value == day.dayOfWeek
          );
          if (selectedIndex == -1) {
            this.days.push(this.addServiceAvailbility(day, this.days.length, index))
          }
        } else {
          this.days.push(this.addServiceAvailbility(day, this.days.length, index))
        }
        this.days.updateValueAndValidity();
        this.sendToStore();
      }
    }

  }

  addNewDays(day, index) {
    let control = this.days;
    control.push(this.createServiceTimings(day))
  }

  addServiceAvailbility(day: AvailableDay, isDayPresent: number, index: number): FormGroup {
    return this.fb.group({
      dayOfWeek: [day.dayOfWeek],
      prefix: day.prefix,
      state: day.state,
      timingInfoList: isDayPresent ?
        day.timingInfoList : this.addNewTimeControl(day.timingInfoList[0])
    });
  }

  getTimeControl() {
    return this.days?.controls[0]?.get('timingInfoList') as FormArray;
  }

  addNewTimeControl(time?: AvailableTime) {
    let arr = this.fb.array([]);
    arr.push(this.fb.group({
      startTime: time ? time.startTime : '',
      endTime: time ? time.endTime : ''
    }))
    return arr;
  }

  deleteSelectedDay(day: AvailableDay, index: number) {
    const selectedIndex: number = this.days.controls.findIndex(
      control => control?.get('dayOfWeek').value == day.dayOfWeek
    );
    if (selectedIndex === 0 && this.days.length > 1) {
      this.days.controls[0].patchValue({
        dayOfWeek: this.days.controls[1].get('dayOfWeek').value,
        prefix: this.days.controls[1].get('prefix').value
      })
      this.days.controls[0].updateValueAndValidity();
      this.days.removeAt(selectedIndex + 1);
    } else {
      this.days.removeAt(selectedIndex);
    }
    this.days.updateValueAndValidity();
    this.sendToStore();
  }

  deleteDay(day: AvailableDay, i: number) {
    const index: number = this.days.controls.findIndex(
      control => control?.get('dayOfWeek').value == day.dayOfWeek
    );
    this.days.removeAt(index)
  }

  addNewTime(control) {
    control.push(
      this.fb.group({
        startTime: [''],
        endTime: ['']
      }))
    control.updateValueAndValidity();
  }

  deleteTime(day, control, index) {
    if (index === 0 && control.value.length === 1) {
      this.availableDays.map(d => {
        if (d.dayOfWeek === day.dayOfWeek.value) {
          d.state = false
        }
      })
      const dayIndex: number = this.days.controls.findIndex(
        control => control.get('dayOfWeek').value == day.dayOfWeek.value
      );
      this.days.removeAt(dayIndex);
    }
    control.removeAt(index)
    this.sendToStore();
  }

  deleteTimeForSelectedDays(index: number) {
    if (index === 0 && (<FormArray>this.days.controls[0].get('timingInfoList')).value.length === 1) {
      this.days.clear();
      this.availableDays.forEach(d => d.state = false)
    } else {
      (<FormArray>this.days.controls[0].get('timingInfoList')).removeAt(index);
      this.days.controls[0].updateValueAndValidity();
      let currentTimeControls = this.days.controls[0].get('timingInfoList') as FormArray;
      this.days.controls.forEach((day, index) => {
        if (index > 0) {
          let timeArr = (<FormArray>day.get('timingInfoList')).value;
          timeArr = currentTimeControls;
          day.updateValueAndValidity();
        }
      })
      this.days.updateValueAndValidity();
    }
    this.sendToStore();
  }

  addNewTimeForSelectedDays() {
    // need to clone   
    this.addNewTimeForSelectedDay(this.days.controls[0]);
  }

  addNewTimeForSelectedDay(day) {
    (<FormArray>day.get('timingInfoList')).push(this.fb.group({
      startTime: [''],
      endTime: ['']
    }))
    day.updateValueAndValidity();
    let currentTimeControls = this.days.controls[0].get('timingInfoList') as FormArray;
    this.days.controls.forEach((day, index) => {
      if (index > 0) {
        let timeArr = (<FormArray>day.get('timingInfoList')).value;
        timeArr = currentTimeControls;
        day.updateValueAndValidity();
      }
    })
    this.days.updateValueAndValidity();
  }

  toggleTimeAvailbility(event: MatSlideToggleChange) {
    this.days?.clear();
    this.availableDays = availableDays();
    this.serviceTimingInfoForm.get("serviceTimeSameForAllDays").patchValue(event.checked);
    // clear service timing on toggle
    this.sendToStore();
  }

  timeChangeHandler(data, obj: any, type: string) {
    obj.get(type).value = data;
    // obj.get(type).updateValueAndValidity();
    const startTime = obj.get('startTime').value;
    const endTime = obj.get('endTime').value;
    if(startTime && endTime) {
      const regex = new RegExp(':', 'g');
      const formattedStartTime = this.createOfferService.formatServiceTime(startTime);
      const formattedEndTime = this.createOfferService.formatServiceTime(endTime);
      if(parseInt(formattedStartTime.replace(regex, ''), 10) >= parseInt(formattedEndTime.replace(regex, ''), 10)){
        this.showTimeError = true;
        return false;
      } else {
        this.showTimeError = false;
      }
      this.sendToStore();
    }   
  }

  timeChangeUpdate(data, obj: any, type: string, index?: number) {
    obj.get(type).value = data;
    this.minValue = data;
    // obj.get(type).updateValueAndValidity();
    this.days.updateValueAndValidity();
    const startTime = obj.get('startTime').value;
    const endTime = obj.get('endTime').value;
    if(startTime && endTime) {
      const regex = new RegExp(':', 'g');
      const formattedStartTime = this.createOfferService.formatServiceTime(startTime);
      const formattedEndTime = this.createOfferService.formatServiceTime(endTime);
      if(parseInt(formattedStartTime.replace(regex, ''), 10) >= parseInt(formattedEndTime.replace(regex, ''), 10)){
        this.showTimeError = true;
        return false;
      } else {
        this.showTimeError = false;
      }
      this.sendToStore();
    }
  }

  sendToStore() {
    let serviceTiming = [];
    if(this.days.length) {
      if(!this.isEnableServiceAvailability) {
        let currentTimeValue = this.days.controls[0].get('timingInfoList').value;
        // format time controls
        serviceTiming = this.days.value.map(obj => ({
          ...obj,
          timingInfoList: currentTimeValue.map(o => ({
            ...o,
            startTime: o.startTime ? this.createOfferService.formatServiceTime(o.startTime) : '',
            endTime: o.endTime ? this.createOfferService.formatServiceTime(o.endTime) : '',
          }))
        }))
      } else {
        serviceTiming = this.days.value.map(obj => ({
          ...obj,
          timingInfoList: obj.timingInfoList.map(o => ({
            ...o,
            startTime: o.startTime ? this.createOfferService.formatServiceTime(o.startTime) : '',
            endTime: o.endTime? this.createOfferService.formatServiceTime(o.endTime) : '',
          }))
        }))
      }      
    }    
    const offer = {
      offerType: this.offer.offerType,
      offerId: this.offer?.draftOfferId,
      categoryId: this.offer?.category?.categoryId,
      serviceTimingInfos: serviceTiming,
      serviceTimeSameForAllDays: this.isEnableServiceAvailability
    }
    this.days.patchValue(this.days.value, { onlySelf: true, emitEvent: false });
    // this.store.dispatch(CreateOfferActions.updateDraftOffer({ offer }))
    this.store.dispatch(CreateOfferActions.offerDraftDataLocalUpdateServiceTiming({
      serviceTimingInfos: serviceTiming,
      serviceTimeSameForAllDays: this.isEnableServiceAvailability
    }));
  }

  // compareTime(time: AvailableTime) {
  //   if (time.startTime && time.endTime) {
  //     this.updateServiceTiming();
  //   }
  // }

  // updateServiceTiming() {
  //   const serviceAvailbility = this.serviceTimingInfoForm.get("serviceTimeSameForAllDays").value;
  //   if (!serviceAvailbility) {
  //     let serviceTimingArray: any[] = this.serviceTimingInfoForm.get('serviceTimingInfos').value;
  //     const timingInfos = serviceTimingArray.length && serviceTimingArray[0].timingInfoList;
  //     serviceTimingArray = serviceTimingArray.map(obj => ({ ...obj, timingInfoList: timingInfos }))
  //     this.serviceTimingInfoForm?.get('serviceTimingInfos').patchValue(serviceTimingArray);
  //     this.serviceTimingInfoForm?.get('serviceTimingInfos').updateValueAndValidity();
  //   }
  // }
}
