import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';

@Component({
  selector: 'app-existing-user-password-verify',
  templateUrl: './existing-user-password-verify.component.html',
  styleUrls: ['./existing-user-password-verify.component.scss']
})
export class ExistingUserPasswordVerifyComponent implements OnInit {

  constructor(private store: Store<gintaaApp.AppState>) { }

  ngOnInit(): void {
  }

  movetoEnterPhoneScreen() {
    this.store.dispatch(
      AuthActions.redirectToSignIn()
    );
  }

}
