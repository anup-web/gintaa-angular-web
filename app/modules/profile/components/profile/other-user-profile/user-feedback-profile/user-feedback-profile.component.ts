import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-feedback-other-profile',
  templateUrl: './user-feedback-profile.component.html',
  styleUrls: ['./user-feedback-profile.component.scss']
})
export class UserFeedbackProfileComponent implements OnInit {

  isPageLoading: boolean = false;
  @Input() userId: string;
  @Input() userAllFeedback: any[] = [];

  @Output("navigateToFeedbackList") navigateToFeedbackList: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  viewAll(){
    this.navigateToFeedbackList.emit();
  }


}
