import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-switch-profiles',
  templateUrl: './switch-profiles.component.html',
  styleUrls: ['./switch-profiles.component.scss']
})
export class SwitchProfilesComponent implements OnInit {

  businessName: string  = null;
  businessId: string    = null;
  businessData: any;

  constructor(
    public dialogRef: MatDialogRef<SwitchProfilesComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data && data.name) {
      this.businessData = data;
      this.businessName = this.businessData.name;
      this.businessId   = this.businessData.businessId;
    }
  }

  ngOnInit(): void {
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  switchCurrentBusiness() {
    this.dialogRef.close(this.businessData);
  }

}
