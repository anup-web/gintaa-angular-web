import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {

  pageTitle:string;
  constructor(
    private dialogRef: MatDialogRef<ConfirmationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) data
    ) { 
      this.pageTitle = data.title;
  }

  ngOnInit(): void {
    
  }

  onClick(confirm:boolean = false) {
    this.dialogRef.close(confirm);
  }

}
