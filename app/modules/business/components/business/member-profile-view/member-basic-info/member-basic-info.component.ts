import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';
import { UpdateMemberComponent } from '../../team-member-popup/update-member/update-member.component';

@Component({
  selector: 'app-member-basic-info',
  templateUrl: './member-basic-info.component.html',
  styleUrls: ['./member-basic-info.component.scss']
})
export class MemberBasicInfoComponent implements OnInit {

  @Input() member: BusinessTeam;

  constructor(      
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {}


  openEditMemberPopup() {    
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-business-member-update';
    dialogConfig.position = {
      top: '20px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      member: this.member
    };
    
    const modalDialog = this.matDialog.open(UpdateMemberComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

}
