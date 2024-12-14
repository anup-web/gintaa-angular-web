import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skelton',
  templateUrl: './skelton.component.html',
  styleUrls: ['./skelton.component.scss']
})
export class SkeltonComponent implements OnInit {

  constructor() { }
  @Input() loader: boolean;

  ngOnInit(): void {
  }

}
