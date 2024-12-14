import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BusinessState, BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { Store } from '@ngrx/store';
import { DeleteMemberComponent } from '../../team-member-popup/delete-member/delete-member.component';

@Component({
  selector: 'app-removed-members',
  templateUrl: './removed-members.component.html',
  styleUrls: ['./removed-members.component.scss']
})
export class RemovedMembersComponent implements OnInit {


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
      this.businessMembers  = businessState.currentBusinessMembers.Removed;
      // this.businessMembers  = businessState.currentBusinessMembers.Pending;
    })
  }

}
