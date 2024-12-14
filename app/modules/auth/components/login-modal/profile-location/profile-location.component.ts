import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.scss']
})
export class ProfileLocationComponent implements OnInit {

  currentAddress: any = null;
  errorMessage: any = null;

  constructor(private store: Store<gintaaApp.AppState>) { }

  ngOnInit(): void {
    this.store.select(selectAuthState).subscribe(authState => {
      this.currentAddress = authState.currentAdress;
      if(this.currentAddress?.lat){
        this.errorMessage = null;
      } 
    });
  }

  redirectToSaveAddress() {
    if(this.currentAddress?.lat){
      this.errorMessage = null;
      this.store.dispatch(
        AuthActions.redirectToSaveAddress()
      );
    } else{
      this.errorMessage = 'Please choose address from map';
    }
  }

}
