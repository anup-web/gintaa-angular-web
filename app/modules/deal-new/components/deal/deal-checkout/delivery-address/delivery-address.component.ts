import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AuthService } from '@gintaa/core/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {NewAddressComponent} from '@gintaa/shared/components/new-address/new-address.component';
@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {

  addressList: any = [];
  addressSubscriber: Subscription;
  enableChange: boolean = false;
  @Input('selectedAddress') selectedAddress: any;
  @Output("updateDeliverAddress") updateDeliverAddress: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    public matDialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/home']);
    } else {
      this.getUserAddress();
    }
  }

  getUserAddress() {
    this.addressSubscriber = this.authService.getUserAddress().subscribe(res => {
      if (res['payload'] && Array.isArray(res['payload'])) {
        this.addressList = res['payload'] ? res['payload'] : [];
        if(!this.selectedAddress){
          if(this.addressList && this.addressList?.length){
            const defaultAddress =  this.addressList.find((val)=>val.default);
            if(defaultAddress){
              this.selectAddress(defaultAddress, 'default');
            } else {
              this.enableChange = true;
            }
          } else {
            this.enableChange = true;
          }
        }
      } else {
        this.addressList = [];
        this.enableChange = true;
      }
    }, err => {
      this.addressList = [];
    })
  }

  toggleChangeAddress(){
    this.enableChange = !this.enableChange;
  }

  addAddress(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'user-new-address-component';
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.height = 'auto';
    dialogConfig.width = '800px';
    const modalDialog = this.matDialog.open(NewAddressComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(results => {
      if(results && results['id']){
        this.getUserAddress();
        this.selectAddress(results);
      }
    });
  }

  selectAddress(address, callType=''){
    this.updateDeliverAddress.emit(address);
    if(callType == ''){
      this.enableChange = !this.enableChange;
    }
  }
}
