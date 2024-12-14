import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@gintaa/core/services';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { CreateBusinessAccountComponent } from '@gintaa/shared/components/create-business-account/create-business-account.component';
@Component({
  selector: 'app-webhome-banner',
  templateUrl: './webhome-banner.component.html',
  styleUrls: ['./webhome-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WebhomeBannerComponent implements OnInit {

  @Input() homepageBanners: any = [];

  constructor(
    private authService: AuthService,
    private router: Router, 
    public matDialog: MatDialog
    ) { }

  public openMenu: boolean = false;

  ngOnInit(): void {
  }

  clickMenu() {
    this.openMenu = !this.openMenu;
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated()
  }

  createBusinessAccount(itemId: number) {
    if (itemId === 2) {
      if (this.authService.isAuthenticated()) {
        this.openCreateBusinessAccountPopup();
      } else {
        this.clickMenu()
        this.openLoginDialog();
      }
    } else {
      return false;
    }
  }

  openLoginDialog() {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-login-component', true, false, 'auto', '906px');
    dialogConfig.position = {
      top: '20px',
    };
    dialogConfig.data = {};
    this.matDialog.open(LoginModalComponent, dialogConfig)
      .afterClosed().subscribe((results) => {
        // do something with results
        if (this.authService.isAuthenticated()) {
         // this.router.navigate(['/listing/item'])
         this.openCreateBusinessAccountPopup();
        }
      });
  }

  openCreateBusinessAccountPopup() {
    const dialogConfigBusiness: MatDialogConfig = new MatDialogConfig();
    dialogConfigBusiness.disableClose = false;
    dialogConfigBusiness.id = 'gintaa-business-register-component';
    dialogConfigBusiness.position = {
      top: '10px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfigBusiness.height = 'auto';
    dialogConfigBusiness.width = '400px';
    dialogConfigBusiness.data = {};

    const modalDialogBusiness = this.matDialog.open(CreateBusinessAccountComponent, dialogConfigBusiness);
    modalDialogBusiness.afterClosed().subscribe((results) => {
      // [BUSINESS ACCOUNT] create modal closed
    });
  }

}
