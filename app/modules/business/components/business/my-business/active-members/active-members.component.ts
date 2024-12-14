import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BusinessState, BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { Store } from '@ngrx/store';
import { UpdateMemberComponent } from '../../team-member-popup/update-member/update-member.component';

@Component({
  selector: 'app-active-members',
  templateUrl: './active-members.component.html',
  styleUrls: ['./active-members.component.scss']
})
export class ActiveMembersComponent implements OnInit {

  businessMembers: any[] = [];

  constructor(
    public matDialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.fetchActiveBusinessMembers();
  }

  fetchActiveBusinessMembers() {
    this.store.select(selectBusinessState).subscribe((businessState: BusinessState) => {
      // this.businessMembers = businessState.currentBusinessMembers.filter(members => members.status === 'active')
      
      this.businessMembers = businessState.currentBusinessMembers.Accepted;
      // console.log('businessMembers:', this.businessMembers);
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
      member
    };

    const modalDialog = this.matDialog.open(UpdateMemberComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

}
