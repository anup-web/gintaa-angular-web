import { Component, OnInit } from '@angular/core';
import { AuthService } from '@gintaa/core/services';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';

@Component({
  selector: 'app-home-section1',
  templateUrl: './home-section1.component.html',
  styleUrls: ['./home-section1.component.scss']
})
export class HomeSection1Component implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,public matDialog: MatDialog) { }

  public openMenu: boolean = false;
  disPlayVideo : boolean = false;
  disPlayImage : boolean = true;

  ngOnInit(): void {
  }

  clickMenu() {
    this.openMenu = !this.openMenu;
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated()
  }
  
  navigateToCreateListing(type:string){
    if (this.authService.isAuthenticated()) {

      this.router.navigate(['/listing/item'])
      // const currentUser = this.authService.getSignInInput();
      // if (currentUser && currentUser.username) {
      //   this.router.navigate(['/listing/item'])
      // } else {
      //   this.store.dispatch(AuthActions.redirectToPrifileName())
      //   this.openLoginDialog(type);
      // }
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
        this.router.navigate(['/listing/item'])
      }
    });
  }

  navigateToCategory(type : string){
    this.router.navigate(['/category'], { 
      queryParams: { 
        searchText: type 
      }
  })
  }

  showVideo(){
    this.disPlayVideo = true;
    this.disPlayImage = false;
  }
}
