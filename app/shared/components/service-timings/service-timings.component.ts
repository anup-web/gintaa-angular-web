import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { selectOfferInfo } from '@gintaa/modules/create-offer/store/create-offer.selectors';
import { AvailableDay, AvailableTime, UserOfferInfo } from '@gintaa/modules/create-offer/store/models/user-offer-info';
import { OfferTypes } from '@gintaa/modules/my-offers/configs/my-offer.enum';
import { select, Store } from '@ngrx/store';
import availableDays from './default-service-timing-config';

@Component({
  selector: 'app-service-timings',
  templateUrl: './service-timings.component.html',
  styleUrls: ['./service-timings.component.scss']
})
export class ServiceTimingsComponent implements OnInit {
  @Input() submitted: boolean;
  parentForm: FormGroup;
  availableDays: AvailableDay[] = availableDays();
  minValue: any;
  offerCategory: string = null;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.parentForm = <FormGroup>this.controlContainer.control;
    this.offerCategory = this.route.snapshot.queryParamMap.get('category') || OfferTypes.Draft.toUpperCase();
    
    let currntUrl = this.router.url;
    
    if(currntUrl && currntUrl.includes('business')) {
      this.subscribeToBusinessFormValue();
    } else {
      this.subscribeToFormValue();
    }
    

  }

  get days(): FormArray {
    return this.parentForm.get("serviceTimingInfos") as FormArray;
  }

  get dayControl(): FormArray {
    return this.days.controls[0].get("timingInfoList") as FormArray;
  }

  get isEnableServiceAvailability(): boolean {
    return this.parentForm.get("serviceTimeSameForAllDays").value;
  }

  get times(): FormArray {
    return this.parentForm.get("timingInformationList") as FormArray;
  }

  subscribeToFormValue() {
    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe((offer: UserOfferInfo) => {
      if (this.parentForm && offer.serviceTimingInfos) {
        if(offer.draftOfferId || (
          this.offerCategory.toUpperCase() === OfferTypes.Published.toUpperCase() && offer.offerId
          )) { 
          this.days.clear();
        }
        //this.parentForm.get("serviceTimeSameForAllDays").setValue(true);
        //this.parentForm.get("serviceTimeSameForAllDays").updateValueAndValidity();
        offer.serviceTimingInfos.forEach(selectedDay => {
          const index = this.availableDays.findIndex(day => day.dayOfWeek === selectedDay.dayOfWeek);
          this.availableDays[index].state = selectedDay.state;
          if(offer.draftOfferId || (
            this.offerCategory.toUpperCase() === OfferTypes.Published.toUpperCase() && offer.offerId
            )) {            
            // needd to add the controls for service timings for draft offer
            this.updateSelectedTimePeriodsForDay(selectedDay, index);
          }
        })
       }
    });
  }
  
  subscribeToBusinessFormValue() {
    this.store.pipe(
      select(selectBusinessState)
    ).subscribe((business) => {
      let currentBusinessDetails = { ...business.currentBusinessDetails };
      if (this.parentForm && currentBusinessDetails.hoursOfOperations) {

        // if(offer.draftOfferId || (
        //   this.offerCategory.toUpperCase() === OfferTypes.Published.toUpperCase() && offer.offerId
        //   )) { 
        //   this.days.clear();
        // }
        
        // this.parentForm.get("serviceTimeSameForAllDays").setValue(true);
        // this.parentForm.get("serviceTimeSameForAllDays").updateValueAndValidity();
        
        // currentBusinessDetails.hoursOfOperations.forEach(selectedDay => {
        //   const index = this.availableDays.findIndex(day => day.dayOfWeek === selectedDay.day);
        //   // this.availableDays[index].state = selectedDay.state;
        //   // if(offer.draftOfferId || (
        //   //   this.offerCategory.toUpperCase() === OfferTypes.Published.toUpperCase() && offer.offerId
        //   //   )) {            
        //   //   // needd to add the controls for service timings for draft offer
        //   //   this.updateSelectedTimePeriodsForDay(selectedDay, index);
        //   // }
        // })

       }
    });
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
      if(isClone) {
        let timeObj: AvailableTime[] = this.days.controls[0].get('timingInfoList').value;
        time.startTime = timeObj[0].startTime;
        time.endTime = timeObj[0].endTime;
      }
      return this.fb.group({
        startTime: [time.startTime],
        endTime: [time.endTime]
      })
  }
  
  updateSelectedTimePeriodsForDay(selectedDay: AvailableDay, index: number) {    
    this.days.push(this.addDraftServiceAvailbility(selectedDay, this.days.length, index))
    this.days.updateValueAndValidity();
  }

  addDraftServiceAvailbility(day: any, isDayPresent: number, index: number) {
    if(this.isEnableServiceAvailability) {
      return this.fb.group({
        dayOfWeek: [day.dayOfWeek],
        prefix: day.prefix,
        state: day.state,
        timingInfoList: this.addNewDraftTimeControl(day.timingInfoList)
      });
    } else {
      return this.fb.group({
        dayOfWeek: [day.dayOfWeek],
        prefix: day.prefix,
        state: day.state,
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
    // console.log('Staratatsrssttsts::', timingInfoLists[0].startTime)
    // console.log('arr::', arr)
    return arr;
  }

  public formatDraftServiceTime(time): Date {
    if(isNaN(time) && isNaN(Date.parse(time))) {
      let date = new Date();
      const timeArr = time.split(":");
      date.setHours(timeArr[0]);
      date.setMinutes(timeArr[1]);
      date.setSeconds(timeArr[2]);
      // console.log('Datatatstst::', date);
      //return `${timeArr[0]}:${timeArr[1]} PM`;
      return date;
    }
    return time;
  }

  updateTimePeriodsForDay(day: AvailableDay, index: number) {
    day.state = !day.state;
    if(this.isEnableServiceAvailability) {
      if(!day.state) {
        this.deleteDay(day, index);
        // control.clear();
        // this.addNewTime(control);
      } else {      
        this.addNewDays(day, index);
        // if(!this.times.length) {
        //   this.setAvailableTimes();
        // }
      } 
    } else {
      if(!day.state) {
        this.deleteSelectedDay(day, index);
      } else {
        if(this.days.length) {
          const selectedIndex:number = this.days.controls.findIndex(
            control => control.get('dayOfWeek').value == day.dayOfWeek
          );
          if(selectedIndex == -1){
            this.days.push(this.addServiceAvailbility(day, this.days.length, index))
          }
        } else {
          this.days.push(this.addServiceAvailbility(day, this.days.length, index))
        }
        this.days.updateValueAndValidity();
      } 
    }
       
  }

  addNewDays(day, index) {
    let control = this.days;
    //control.insert(index, this.createServiceTimings(day))
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
    return this.days.controls[0].get('timingInfoList') as FormArray;
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
    const selectedIndex:number = this.days.controls.findIndex(
      control => control.get('dayOfWeek').value == day.dayOfWeek
    );
    if(selectedIndex === 0 && this.days.length > 1){ 
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
  }

  deleteDay(day: AvailableDay, i: number) {
    const index:number = this.days.controls.findIndex(
      control => control.get('dayOfWeek').value == day.dayOfWeek
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
    if(index === 0 && control.value.length === 1) {      
      // console.log(day.dayOfWeek.value);
      this.availableDays.map(d => {
       if(d.dayOfWeek === day.dayOfWeek.value)
            {
              d.state = false
            }      
          })
      const dayIndex:number = this.days.controls.findIndex(
        control => control.get('dayOfWeek').value == day.dayOfWeek.value
      );
      this.days.removeAt(dayIndex);
    }
    control.removeAt(index)
  } 
  
  deleteTimeForSelectedDays(index: number) { 
    if(index === 0 && (<FormArray>this.days.controls[0].get('timingInfoList')).value.length === 1) {
      this.days.clear();
      this.availableDays.forEach(d => d.state = false)
    } else {
      (<FormArray>this.days.controls[0].get('timingInfoList')).removeAt(index);    
      this.days.controls[0].updateValueAndValidity();
      let currentTimeControls = this.days.controls[0].get('timingInfoList') as FormArray;
      this.days.controls.forEach((day, index) => {
        if(index > 0) {
          let timeArr = (<FormArray>day.get('timingInfoList')).value;
          timeArr = currentTimeControls;
          day.updateValueAndValidity();
        }      
      })
      this.days.updateValueAndValidity();
    }
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
      if(index > 0) {
        let timeArr = (<FormArray>day.get('timingInfoList')).value;
        timeArr = currentTimeControls;
        day.updateValueAndValidity();
      }      
    })
    this.days.updateValueAndValidity();
  }  

  toggleTimeAvailbility(event : MatSlideToggleChange) { 
    // reset service timing state  
    this.days.clear();   
    this.availableDays = availableDays();
    // this.days.controls.forEach(day => {
    //   (<FormArray>day.get('timingInfoList')).clear();
    //   this.addNewTime(day.get('timingInfoList'));
    // })
  }

  timeChangeHandler(data, obj: any, type: string) {
    //let time = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    // let hours: number = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
    // let minutes: number = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
    // let time = `${hours}:${minutes}:00`;
    obj.get(type).value = data;
    obj.get(type).updateValueAndValidity();
    // this.compareTime(obj);
  }

  timeChangeUpdate(data, obj: any, type: string, index?: number) {
    // let hours: number = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
    // let minutes: number = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
    // let time = `${hours}:${minutes}:00`;    
    obj.get(type).value = data;
    this.minValue = data;
    obj.get(type).updateValueAndValidity();
    this.days.updateValueAndValidity();
    // this.compareTime(obj);    
  }

  compareTime(time: AvailableTime) {
    // const startDate = new Date(time.startTime);
    // const endDate = new Date(time.endTime);
    // // const regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;
    // if(startDate && endDate) {
    //   // if(parseInt(endTime .replace(regExp, "$1$2$3")) > parseInt(startTime .replace(regExp, "$1$2$3"))){
    //   //   alert("End time is greater");
    //   // } else {
    //   //   alert("End time is smaller");
    //   // }
    //   if(startDate.getTime() > endDate.getTime()) {
    //     alert("End time is smaller");
    //   } else if(startDate.getTime() === endDate.getTime()) {
    //     alert("End time is equal to start");
    //   } else {
    //     alert("End time is greater");
    //   }
    // }
    if(time.startTime && time.endTime) {
      // console.log('Update Timing Info');
      this.updateServiceTiming();   
    }
  }

  updateServiceTiming() {
    const serviceAvailbility = this.parentForm.get("serviceTimeSameForAllDays").value;
    if(!serviceAvailbility) {
      let serviceTimingArray: any[] = this.parentForm.get('serviceTimingInfos').value;      
      const timingInfos = serviceTimingArray.length && serviceTimingArray[0].timingInfoList;
      serviceTimingArray = serviceTimingArray.map(obj => ({ ...obj, timingInfoList: timingInfos })) 
      this.parentForm.get('serviceTimingInfos').patchValue(serviceTimingArray);
      this.parentForm.get('serviceTimingInfos').updateValueAndValidity();
    }
  }
}
