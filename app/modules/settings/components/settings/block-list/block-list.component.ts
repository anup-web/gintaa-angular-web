import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UnblockPopupComponent } from '@gintaa/modules/settings/components/settings/block-list/unblock-popup/unblock-popup.component';

import { Store, select  } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { blockUser } from '@gintaa/modules/settings/models/settings.model';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {


  public blockUsers: blockUser[] = [];
  public unblockUserIndex: number = null;

  constructor(
    public matDialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
  ) { }



  ngOnInit(): void {
    this.getBlockUserList();
    this.store.select(selectSettingsState).subscribe(settingsState => {

      let userList = settingsState.blockUserList; 
      this.blockUsers  =  (userList != undefined) ? JSON.parse(JSON.stringify(userList)) : [];

      // console.log('blockUsers:', this.blockUsers);
    });
  }

  getBlockUserList() {
    this.store.dispatch(
      SettingsActions.fetchBlockUserList()
    );
  }
  
  unBlockDialog(unBlockUserIndex: number) {
    
    this.unblockUserIndex = unBlockUserIndex;

    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '50px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '343px';
    dialogConfig.data = {};

    const modalDialog = this.matDialog.open(UnblockPopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
      // console.log('close unblock popup:', results)
      if(results != undefined && results === 'confirmUnblock') {
        this.unblockUser();
      }
    });
  }

  unblockUser() {
    let userIndex = this.unblockUserIndex;
    this.blockUsers.splice(userIndex, 1);
  }

}