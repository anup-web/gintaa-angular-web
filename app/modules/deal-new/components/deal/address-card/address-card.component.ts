import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {

  @Input('data') data: any;
  @Input('suggestPage') suggestPage: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
