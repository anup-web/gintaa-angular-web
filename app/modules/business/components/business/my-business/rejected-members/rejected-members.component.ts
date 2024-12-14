import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BusinessState, BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { Store } from '@ngrx/store';
import { DeleteMemberComponent } from '../../team-member-popup/delete-member/delete-member.component';

@Component({
  selector: 'app-rejected-members',
  templateUrl: './rejected-members.component.html',
  styleUrls: ['./rejected-members.component.scss']
})
export class RejectedMembersComponent implements OnInit {

  businessMembers: any[] = [];

  constructor(
    private store: Store,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchActiveBusinessMembers();
  }

  fetchActiveBusinessMembers() {
    this.store.select(selectBusinessState).subscribe((businessState: BusinessState) => {
      // this.businessMembers = businessState.currentBusinessMembers.filter(members => members.status === 'rejected')
      this.businessMembers  = businessState.currentBusinessMembers.Rejected;
      // this.businessMembers  = businessState.currentBusinessMembers.Pending;
    })
  }

  openUpdateMemberPopup(member: BusinessTeam) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-business-member-update';
    dialogConfig.position = {
      top: '20px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      member: member,
      invitationType: 'rejected'
    };

    const modalDialog = this.matDialog.open(DeleteMemberComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

}
