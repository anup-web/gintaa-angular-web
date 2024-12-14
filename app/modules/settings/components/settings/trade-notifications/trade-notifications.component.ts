import { Component, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { NotificationTab } from '@gintaa/modules/settings/models/settings.model';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';

@Component({
  selector: 'app-trade-notifications',
  templateUrl: './trade-notifications.component.html',
  styleUrls: ['./trade-notifications.component.scss']
})
export class TradeNotificationsComponent implements OnInit {

  public tabList: NotificationTab[] = [];
  public loading: boolean = true;

  constructor(
    private store: Store<gintaaApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.getAllNotification();
    this.store.select(selectSettingsState).subscribe(settingsState => {
      let tabNList = settingsState.tradeNotificationTabs;
      this.tabList  =  (tabNList != undefined) ? JSON.parse(JSON.stringify(tabNList)) : [];
      this.loading  = settingsState.loading;
      // console.log('loading-----:', tabNList, this.loading);
      // console.log('tabList-----:', this.tabList);
    });
  }

  getAllNotification() {
    this.store.dispatch(
      SettingsActions.geAllNotificationSettings()
    );
  }

}
