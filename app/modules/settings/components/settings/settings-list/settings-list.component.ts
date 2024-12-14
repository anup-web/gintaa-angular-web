import { Component, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  public blockUserCount: number = 0;

  constructor(private store: Store<gintaaApp.AppState>) { }

  ngOnInit(): void {
    this.getBlockUserCount();
    this.store.select(selectSettingsState).subscribe(settingsState => {
      let count = settingsState.blockUserCount;
      this.blockUserCount  =  (count != undefined) ? count : 0;

    });
  }

  getBlockUserCount() {
    this.store.dispatch(
      SettingsActions.fetchBlockUserCount()
    );
  }

}
