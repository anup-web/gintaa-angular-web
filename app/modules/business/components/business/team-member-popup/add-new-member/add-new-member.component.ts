import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIGS } from '@gintaa/config/enum.config';

import * as gintaaApp from '@gintaa/store/app.reducer';
import { BusinessTeam, BusinessState, BusinessRole } from '@gintaa/modules/business/models/BusinessState.model';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';
import { businessAddMemberError } from '@gintaa/modules/business/configs/business-error.config';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class AddNewMemberComponent implements OnInit {

  currentBusinessId: string = null;
  member: BusinessTeam = null;
  businessMemberForm: FormGroup;
  allBusinessRoles: BusinessRole;
  errorMessage: string;

  businessAddMemberError = businessAddMemberError;

  constructor(
    public dialogRef: MatDialogRef<AddNewMemberComponent>,
    private router: ActivatedRoute,
    private store: Store<gintaaApp.AppState>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentBusinessId  = data.businessId;
    this.allBusinessRoles   = data.allBusinessRoles;
    // console.log('currentBusinessId:',this.currentBusinessId, this.allBusinessRoles);
  }

  ngOnInit(): void {
    this.businessMemberForm = this.formBuilder.group({
        members: new FormArray([])
    });
    this.addMemberFormFieldSet();
    this.businessMemberSubscriber();
  }
  
  businessMemberSubscriber() {
    this.store.select(selectBusinessState).subscribe((businessState: BusinessState) => {
      if (businessState.closeOpenedModel) {
        // close popup
        this.onDialogClose();
      }

      this.errorMessage = businessState.errorMessage;
    })
  }

  memberFormFieldSet() {
    return this.formBuilder.group({
      businessRole: new FormControl('MEMBER', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(APP_CONFIGS.VALID_PHONE_REGEX)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
        Validators.maxLength(100),
        Validators.pattern(APP_CONFIGS.VALID_EMAIL_REGEX)
      ])
    });
  }

  addMemberFormFieldSet() {
    this.t.push(this.memberFormFieldSet());
  }

  removeFieldSet(i: number) {
    this.t.removeAt(i);
  }

    // convenience getters for easy access to form fields
    get f() { return this.businessMemberForm.controls; }
    get t() { return this.f.members as FormArray; }

  onDialogClose() {
    this.dialogRef.close();
    // reset closeOpenedPopup status
    this.store.dispatch(
      BusinessActions.resetCloseOpenedPopupStatus()
    );
  }

  updateRole(index: number, role: string) {
    
    // Set role to form value
    this.businessMemberForm.value.members[index].businessRole = role;

    // Set all form value with role to form data
    this.businessMemberForm.setValue(this.businessMemberForm.value);
  }

  addMember() {

    // console.log("businessMemberForm:", this.businessMemberForm.value.members);


    this.errorMessage = null;

    if (this.businessMemberForm && !this.businessMemberForm.invalid) {
      let members = this.processMemberInvitationData(this.businessMemberForm.value.members);
      
      // dispatch update
      this.store.dispatch(
        BusinessActions.addBusinessMember({
          members: members, //this.businessMemberForm.value.members,
          businessId: this.currentBusinessId
        })
      );
      
    }
  }

  resetMemberForm() {
    this.businessMemberForm.reset();
  }

  processMemberInvitationData(memberData: any[]) {
    if(memberData) {
      memberData.map((member)=>{
        member.mobile = this.add91ToPhoneNumber(member.mobile);
        return member;
      })
    }

    return memberData;
  }
  

  remove91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if(phone && phone.includes(replaceString)) {
      phone = phone.replace(replaceString, '')
    }
    return phone;
  }

  add91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if(phone && !phone.includes(replaceString)) {
      phone = replaceString+phone;
    }
    return phone;
  }

}
