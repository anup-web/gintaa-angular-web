import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockListComponent } from './components/settings/block-list/block-list.component';
import { CredentialsComponent } from './components/settings/credentials/credentials.component';

import { SettingsComponent } from './components/settings/settings.component';
import { TradeNotificationsComponent } from './components/settings/trade-notifications/trade-notifications.component';


const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'authorization', component: CredentialsComponent },
  { path: 'trade-notification', component: TradeNotificationsComponent },
  { path: 'block-list', component: BlockListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsRoutingModule { }
