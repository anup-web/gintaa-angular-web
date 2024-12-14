import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-report-user',
  templateUrl: './chat-report-user.component.html',
  styleUrls: ['./chat-report-user.component.scss']
})
export class ChatReportUserComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChatReportUserComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
