import { Component, OnInit } from '@angular/core';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {

  utilitySuccessMessage: string = null;
  showOtherErrors: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribeToUtilityState();
  }

  subscribeToUtilityState() {
    this.store.select(selectUtilityState).subscribe(utilityState => {
      this.utilitySuccessMessage = utilityState.successMessage;
    })
  }

  clearSuccessMessage() {
    this.store.dispatch(UtilityActions.unsetSuccessMessage())
  }

}
