import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIGS } from '@gintaa/config/enum.config';

import * as gintaaApp from '@gintaa/store/app.reducer';
import { BusinessTeam, BusinessState, BusinessRole } from '@gintaa/modules/business/models/BusinessState.model';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { DeleteMemberComponent } from '../delete-member/delete-member.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.scss']
})
export class UpdateMemberComponent implements OnInit {

  currentBusinessId: string = null;
  member: BusinessTeam = null;
  businessMemberForm: FormGroup;
  selectedRole: string;
  allBusinessRoles: BusinessRole[];

  constructor(
    public dialogRef: MatDialogRef<UpdateMemberComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private router: ActivatedRoute,
    private store: Store<gintaaApp.AppState>,
    public matDialog: MatDialog
  ) {
    if (dialogData && dialogData.member) {
      this.member             = dialogData.member;
      this.selectedRole       = this.member.businessRole;
      this.currentBusinessId  = this.member.businessProfileId;
    }
  }

  ngOnInit(): void {
    // initialize reactive form
    // this.businessMemberForm = new FormGroup({
    //   memberName: new FormControl(this.member.memberDetails.name, [
    //     Validators.required,
    //     Validators.minLength(4),
    //   ]),
    //   memberPhone: new FormControl(this.formatPhone(this.member.memberDetails.mobile), [
    //     Validators.required,
    //     Validators.minLength(10),
    //     Validators.maxLength(13),
    //     Validators.pattern(APP_CONFIGS.VALID_PHONE_REGEX)
    //   ]),
    //   memberEmail: new FormControl(this.member.memberDetails.email, [
    //     Validators.required,
    //     Validators.minLength(4),
    //     Validators.email,
    //     Validators.maxLength(30),
    //     Validators.pattern(APP_CONFIGS.VALID_EMAIL_REGEX)
    //   ])
    // });

    
    this.store.select(selectBusinessState).subscribe((businessState: BusinessState) => {

      this.allBusinessRoles = businessState.allBusinessRoles;


      // if (businessState.refreshBusinessMembers) {
      //   this.store.dispatch(
      //     BusinessActions.fetchBusinessMembers({
      //       businessId: this.currentBusinessId
      //     })
      //   );
      // }
    })

  }

  // reactive form getters
  // get memberName() { return this.businessMemberForm.get('memberName'); }
  // get memberPhone() { return this.businessMemberForm.get('memberPhone'); }
  // get memberEmail() { return this.businessMemberForm.get('memberEmail'); }

  onDialogClose() {
    this.dialogRef.close();
  }


  openDeleteMemberPopup() {

    // console.log("open delete member popup");

    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-business-accepted-member-delete';
    dialogConfig.position = {
      top: '20px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      member: this.member
    };

    const modalDialog = this.matDialog.open(DeleteMemberComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

  toggleActivation(event : MatSlideToggleChange) {
    // console.log('event:', event);
    let activeStatus = event.checked;
    
    // dispatch update
    this.store.dispatch(
      BusinessActions.updateMemberActivationStatus({
        businessId: this.currentBusinessId,
        userId: this.member.memberId,
        activateStatus: activeStatus
      })
    );

  }

  // removeMember() {
  //   // dispatch delete
  //   this.store.dispatch(
  //     BusinessActions.removeBusinessMember({
  //       member: this.member
  //     })
  //   );

  //   this.onDialogClose();
  // }

  updateMember() {

    let selectedRoleObj: string = this.allBusinessRoles.filter((r)=> r.code === this.selectedRole)[0].id;

    // dispatch update
      this.store.dispatch(
        BusinessActions.updateBusinessMember({
          businessId: this.currentBusinessId,
          memmberId: this.member.memberId,
          selectedRoleId: selectedRoleObj
        })
      );
  }

  formatPhone(phone: string) {
    if (phone && phone.substring(0, 3) === '+91') {
      return phone.substring(3).trim();
    } else {
      return phone;
    }
  }

  updateRole(selectRole: string) {
      this.selectedRole = selectRole;
  }

}
