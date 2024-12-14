import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-business',
  templateUrl: './admin-business.component.html',
  styleUrls: ['./admin-business.component.scss']
})
export class AdminBusinessComponent implements OnInit {

  @Input() role: string = 'Admin';
  panelExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {}

}
