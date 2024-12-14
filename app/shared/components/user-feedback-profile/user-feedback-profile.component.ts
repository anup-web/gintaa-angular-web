import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-feedback-profile',
  templateUrl: './user-feedback-profile.component.html',
  styleUrls: ['./user-feedback-profile.component.scss']
})
export class UserFeedbackProfileComponent implements OnInit {

  isPageLoading: boolean = false;
  @Input() userId: string;
  @Input() ratings: any[];
  @Input() title: string = 'User Feedback';
  shortUserFeedBack:any[];

  @Output("navigateToFeedbackList") navigateToFeedbackList: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  viewAll(){
    this.navigateToFeedbackList.emit();
  }

  counter(i: any) {
    return new Array(i);
}

}
