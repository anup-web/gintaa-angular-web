import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BusinessRole, BusinessState, BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { Store } from '@ngrx/store';
import { InvitedMemberComponent } from '../../team-member-popup/invited-member/invited-member.component';

@Component({
  selector: 'app-invited-members',
  templateUrl: './invited-members.component.html',
  styleUrls: ['./invited-members.component.scss']
})
export class InvitedMembersComponent implements OnInit {

  businessMembers: any[] = [];
  allBusinessRoles: BusinessRole[] = [];

  constructor(
    private store: Store,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchActiveBusinessMembers();
  }

  fetchActiveBusinessMembers() {
    this.store.select(selectBusinessState).subscribe((businessState: BusinessState) => {
      // this.businessMembers = businessState.currentBusinessMembers.filter(members => members.status === 'invited')
      
      this.businessMembers  = businessState.currentBusinessMembers.Pending;

      if(businessState.allBusinessRoles){
        this.allBusinessRoles = businessState.allBusinessRoles;
      }

      if (businessState.closeOpenedModel) {
        // reset the values before closing
        this.matDialog.closeAll();
        
      }

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
      allBusinessRoles: this.allBusinessRoles
    };

    const modalDialog = this.matDialog.open(InvitedMemberComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

}
