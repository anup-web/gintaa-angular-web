import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deal-user-view',
  templateUrl: './deal-user-view.component.html',
  styleUrls: ['./deal-user-view.component.scss']
})
export class DealUserViewComponent implements OnInit {

  @Input('user') user: any;
  @Input('callerIsReceiver') callerIsReceiver: boolean = false;
  @Input('userLocation') userLocation: any;
  @Input('pageType') pageType: string;
  @Input('showUser') showUser: boolean = false;
  @Input('logo') logo: boolean = false;
  @Input('direction') direction: string = 'right';
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';

  constructor() { }

  ngOnInit(): void {
  }

}
