import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unblock-popup',
  templateUrl: './unblock-popup.component.html',
  styleUrls: ['./unblock-popup.component.scss']
})
export class UnblockPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UnblockPopupComponent>,
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.dialogRef.close('confirmUnblock');
  }

}
