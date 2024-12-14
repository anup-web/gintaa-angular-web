import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-rating',
  templateUrl: './show-rating.component.html',
  styleUrls: ['./show-rating.component.scss']
})
export class ShowRatingComponent implements OnInit {

  @Input() ratingNumber: number;
  numbers = [];
  constructor(
  ) { }
  ngOnInit(): void {
    if(this.ratingNumber && this.ratingNumber > 0){
      this.numbers = Array(this.ratingNumber).fill(1);
    }
  }

}
