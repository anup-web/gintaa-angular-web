import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-success',
  templateUrl: './change-password-success.component.html',
  styleUrls: ['./change-password-success.component.scss']
})
export class ChangePasswordSuccessComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.dialogRef.close();
  }

}
