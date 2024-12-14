import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skelton-feedback',
  templateUrl: './skelton-feedback.component.html',
  styleUrls: ['./skelton-feedback.component.scss']
})
export class SkeltonFedbackComponent implements OnInit {

  constructor() { }
  @Input() loader: boolean;
  @Input() fullPage: boolean;
  
  ngOnInit(): void {
  }

}
