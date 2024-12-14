import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import Moment from 'moment';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { currentUserDetails } from '@gintaa/modules/auth/store/auth.selectors';
import { btnFadeInOut, fadeIn } from 'projects/gintaa/src/app/animation';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM Y',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM Y'
  }
};
@Component({
  selector: 'app-profile-dob-gender',
  templateUrl: './profile-dob-gender.component.html',
  styleUrls: ['./profile-dob-gender.component.scss'],
  animations: [ fadeIn, btnFadeInOut],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentDateAdapter}
  ]
})
export class ProfileDobGenderComponent implements OnInit {

  maxMatDate = new FormControl(new Date());
  userDob: string;
  userGender: string;
  invalidDob = true;
  invalidGender = true;
  dateError: string = null;
  defaultRestrictedAge: number = 18;
  parsedErrorMessage: string = null;
  currentUserProfile: any;
  today = new Date();
  maxDatePicker: any;
  minDatePicker: any;

  constructor(private store: Store<gintaaApp.AppState>) { }

  ngOnInit(): void {
    this.fetchDataFromStore();
    const newDate = this.today.setFullYear(this.today.getFullYear() - 19);
    const newDate2 = this.today.setFullYear(this.today.getFullYear() - 80);
    this.maxDatePicker = new Date(newDate); 
    this.minDatePicker = new Date(newDate2); 
  }

  setUserDOB(event: MatDatepickerInputEvent<Date>) {
    // check invalid value
    if (!event.value) {
      this.invalidDob = true;
      this.dateError = 'Please enter a valid date of birth';
      return;
    }

    // check 18 year age restriction
    if (this.calculateAge(event.value) > this.defaultRestrictedAge) {
      this.userDob = Moment(event.value).format('YYYY-MM-DD');
      this.invalidDob = false;
    } else {
      this.invalidDob = true;
      this.dateError = 'Sorry! You must be above 18 years to continue'
    }
  }

  calculateAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  setUserGender(gender: string) {
    this.userGender = gender;
    this.invalidGender = false;
  }
  
  saveDobAndGender() {
    if (!this.userDob) {
      this.invalidDob = true;
    }

    if (!this.userGender) {
      this.invalidGender = true;
    }

    if (!this.invalidDob || !this.invalidGender) {
      this.store.dispatch(
        AuthActions.saveDobAndGender({ dob: this.userDob, gender: this.userGender })
      );

      const user = {
        name: this.currentUserProfile.name,
      }
      if(!this.invalidDob){
        user['dob'] = this.userDob;
      }
      if(!this.invalidGender){
        user['gender'] = this.userGender;
      }


      this.store.dispatch(
        AuthActions.updateUserProfile({ user, from: 'dob-gender' })
      );
    }
  }

  fetchDataFromStore() {
    this.store.select(currentUserDetails).subscribe((currentState) => {
      // save user info
      this.currentUserProfile = currentState || null;

      // show parsed error message
      const errObj = currentState.errorMessage;

      if(currentState.dob){
        this.userDob = currentState.dob;
        if (this.calculateAge(this.userDob) > this.defaultRestrictedAge) {
          this.userDob = Moment(this.userDob).format('YYYY-MM-DD');
          this.invalidDob = false;
        } else {
          this.invalidDob = true;
          this.dateError = 'Sorry! You must be above 18 years to continue'
        }
      }
      if(currentState.gender){
        this.userGender = currentState.gender;
        this.invalidGender = false;
      }

      if (errObj && errObj.error && errObj.error.payload && errObj.error.payload.length) {
        this.parsedErrorMessage = errObj.error.payload[errObj.error.payload.length - 1].reason;
      } else if (errObj && errObj.message) {
        this.parsedErrorMessage = errObj.message;
      }
    });
  }

}
