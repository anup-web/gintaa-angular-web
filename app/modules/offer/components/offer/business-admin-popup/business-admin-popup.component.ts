import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-business-admin-popup',
  templateUrl: './business-admin-popup.component.html',
  styleUrls: ['./business-admin-popup.component.scss']
})
export class BusinessAdminPopupComponent implements OnInit {

  memberRole: string = 'Admin';
  businessId: string  = '';
  offerId: string     = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    if(data) {
      this.businessId = data.businessId;
      this.offerId    = data.offerId;
    }
  }

  ngOnInit(): void {
  }

}
