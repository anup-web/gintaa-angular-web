import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { BusinessState, BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-assign-offer-popup',
  templateUrl: './assign-offer-popup.component.html',
  styleUrls: ['./assign-offer-popup.component.scss']
})
export class AssignOfferPopupComponent implements OnInit {

  businessMembers: BusinessTeam[] = [];
  selectedMemberId: string;

  constructor(
    public dialogRef: MatDialogRef<AssignOfferPopupComponent>,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.fetchActiveBusinessMembers();
  }

  fetchActiveBusinessMembers() {
    this.store.select(selectBusinessState).subscribe((businessState: BusinessState) => {
      this.businessMembers = businessState.currentBusinessMembers.filter(members => members.status === 'active')
    })
  }

  updateSelectedMember(event: MatRadioChange) {
    this.selectedMemberId = event.value;
    this.onDialogClose();
  }

  onDialogClose() {
    this.dialogRef.close();
  }

}
