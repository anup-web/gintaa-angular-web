import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  /*******
   * IF NEED TO SHOW ERROR
   * WE NEED TO SET THE 'errorMessage' FLAG IN UTILITY STORE
   * MAY BE IF WE FACE ANY ISSUE WITH UTILITY STATE, WE NEED TO ACCEPT IT FROM OUTSIDE
   * @Input() errorMessage: string = null;
   */
  utilityErrorMessage: string = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribeToUtilityState();
  }

  subscribeToUtilityState() {
    this.store.select(selectUtilityState).subscribe(utilityState => {
      if (utilityState.errorMessage) {
        this.utilityErrorMessage = utilityState.errorMessage;
      }
    })
  }

  clearErrorMessage() {
    this.store.dispatch(
      UtilityActions.unsetErrorMessage()
    )
  }

}
