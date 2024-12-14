import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-company-deal-comments',
  templateUrl: './company-deal-comments.component.html',
  styleUrls: ['./company-deal-comments.component.scss']
})
export class CompanyDealCommentsComponent implements OnInit {

  @Input() title: string = 'Deal comments';
  isPageLoading: boolean = false;
  @Input() userId: string;
  @Input() ratings: any[] = [];

  @Output("navigateToFeedbackList") navigateToFeedbackList: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  viewAll(){
    this.navigateToFeedbackList.emit();
  }

}
