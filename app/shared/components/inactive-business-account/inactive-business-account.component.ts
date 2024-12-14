import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inactive-business-account',
  templateUrl: './inactive-business-account.component.html',
  styleUrls: ['./inactive-business-account.component.scss']
})
export class InactiveBusinessAccountComponent implements OnInit {

  businessName: string = null;

  constructor(
    public dialogRef: MatDialogRef<InactiveBusinessAccountComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data && data.name) {
      this.businessName = data.name;
    }
  }

  ngOnInit(): void {
  }

  onDialogClose() {
    this.dialogRef.close();
  }

}
