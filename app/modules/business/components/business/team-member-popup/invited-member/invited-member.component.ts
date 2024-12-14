import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import * as gintaaApp from '@gintaa/store/app.reducer';
import { BusinessRole, BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { BusinessState } from  '@gintaa/modules/business/models/BusinessState.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';
import { DeleteMemberComponent } from '../delete-member/delete-member.component';

@Component({
  selector: 'app-invited-member',
  templateUrl: './invited-member.component.html',
  styleUrls: ['./invited-member.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class InvitedMemberComponent implements OnInit {

  currentBusinessId: string = null;
  member: any = null;
  businessMemberForm: FormGroup;
  defaultRole: string = 'MANAGER';
  selectedRole: string;
  allBusinessRoles: BusinessRole;
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';

  constructor(
    public dialogRef: MatDialogRef<InvitedMemberComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private router: ActivatedRoute,
    private store: Store<gintaaApp.AppState>,    
    public matDialog: MatDialog
  ) {
    if (dialogData && dialogData.member) {
      this.member = dialogData.member;
      this.selectedRole = this.member.businessRole;
      this.currentBusinessId = this.member.businessProfileId;
      this.allBusinessRoles   = dialogData.allBusinessRoles;
    }
  }

  ngOnInit(): void {
    this.businessMemberForm = new FormGroup({
      invitationMessage: new FormControl('', [
        // Validators.required,
        Validators.minLength(5),
      ]),
      invitationRole: new FormControl(this.defaultRole, [
        Validators.required
      ])
    });
  }

  get invitationMessage() { return this.businessMemberForm.get('invitationMessage'); }
  get invitationRole() { return this.businessMemberForm.get('invitationRole'); }

  onDialogClose() {
    this.dialogRef.close();
  }

  updateRole(role: string) {
    // Can't change the role inside resend Invitation 
    // this.selectedRole = role;
  }

  resendInvitation() {
    if (this.businessMemberForm && !this.businessMemberForm.invalid) {
      this.store.dispatch(
        BusinessActions.resendInvitation({
          userId: this.member.id,
          businessId: this.currentBusinessId,
          message: this.businessMemberForm.value.invitationMessage
        })
      );

      this.onDialogClose();
    }
  }

  // removeInvitation() {
  //   this.store.dispatch(
  //     BusinessActions.removeInvitation({
  //       userId: this.member.userId
  //     })
  //   );

  //   this.onDialogClose();
  // }

  openDeleteMemberPopup() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-business-member-delete';
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

}
