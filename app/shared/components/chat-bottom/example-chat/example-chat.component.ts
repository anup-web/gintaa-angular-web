import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-example-chat',
  templateUrl: './example-chat.component.html',
  styleUrls: ['./example-chat.component.scss']
})
export class ExampleChatComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  showBottomSheet() {
  }
}


