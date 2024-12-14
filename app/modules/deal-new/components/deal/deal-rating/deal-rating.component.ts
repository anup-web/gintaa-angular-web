import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deal-rating',
  templateUrl: './deal-rating.component.html',
  styleUrls: ['./deal-rating.component.scss']
})
export class DealRatingComponent implements OnInit {
  @Input('dealDetails') dealDetails: any = null;
  @Input('userDetails') userDetails: any = null;
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';

  constructor() { }

  ngOnInit(): void {
  }

}
