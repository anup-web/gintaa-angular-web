import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@gintaa/core/services';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';

@Component({
  selector: 'app-floating-listing',
  templateUrl: './floating-listing.component.html',
  styleUrls: ['./floating-listing.component.scss']
})
export class FloatingListingComponent implements OnInit {
  public openMenu: boolean = false;

  constructor( private authService: AuthService,private router: Router,public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  navigateToListing(type:string){
    // console.log("type",type);
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/listing/'+type+'']);
    } else {
      this.clickMenu()
      this.openLoginDialog(type);
      // need to open login modal
    }
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
        this.router.navigate(['/listing/'+type+''])      
      }
    });
  }
 
  clickMenu() {
    this.openMenu = !this.openMenu;
  }

}
