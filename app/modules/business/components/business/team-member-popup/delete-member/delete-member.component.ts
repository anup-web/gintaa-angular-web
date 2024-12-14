import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';

import * as gintaaApp from '@gintaa/store/app.reducer';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.scss']
})
export class DeleteMemberComponent implements OnInit {

  currentBusinessId: string = null;
  member: any = null;
  invitationType: string = null;

  constructor(
    public dialogRef: MatDialogRef<DeleteMemberComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private router: ActivatedRoute,
    private store: Store<gintaaApp.AppState>
  ) {
    this.currentBusinessId = this.router.snapshot.params.id;
    if (dialogData && dialogData.member) {
      this.member = dialogData.member;
      this.invitationType = (dialogData.invitationType) ? dialogData.invitationType : null;
    }
  }

  ngOnInit(): void {}

  onDialogClose() {
    this.dialogRef.close();
  }

  removeInvitation() {
    // console.log('member:', this.member);
    let businessId    = this.member.businessProfileId;
    let invitationId  = this.member.id;
    
    let accepted = this.member.accepted;

    if(!accepted) {      
      ////////// Delete invitate member ////////////////
      this.store.dispatch(
        BusinessActions.removeInvitation({
          userId: invitationId,
          businessId: businessId,
          invitationType: (this.invitationType && this.invitationType === 'rejected') ? 'rejected' : 'invited'
        })
      );

    } else {
      ////////// Delete accepted member ////////////////
      this.store.dispatch(
        BusinessActions.removeBusinessMember({
          member: this.member
        })
      );
      // this.onDialogClose();
    }

    // this.onDialogClose();
  }

}
