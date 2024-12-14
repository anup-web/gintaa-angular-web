import { Component, OnInit } from '@angular/core';
import { AuthService } from '@gintaa/core/services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-gintaa-work',
  templateUrl: './how-gintaa-work.component.html',
  styleUrls: ['./how-gintaa-work.component.scss']
})
export class HowGintaaWorkComponent implements OnInit {

  breadcrumb =  [{
    name: 'How gintaa works',
    show: true,
    click: false,
  }]

  public openMenu: boolean = false;

  constructor(private authService: AuthService,public matDialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  navigateToLoginPage(){
    this.clickMenu()
    this.openLoginDialog('home');
  }

  openLoginDialog(type: string) {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-login-component', true, false, 'auto', '906px');
    dialogConfig.position = {
      top: '20px',
    };
    dialogConfig.data = {};
    this.matDialog.open(LoginModalComponent, dialogConfig)
    .afterClosed().subscribe((results) => {
      // do something with results
      if(this.authService.isAuthenticated()) {
       
          this.router.navigate(['/home'])
              
      }
    });
  }

  clickMenu() {
    this.openMenu = !this.openMenu;
  }

}
