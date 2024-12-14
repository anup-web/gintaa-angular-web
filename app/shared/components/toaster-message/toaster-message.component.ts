import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '@gintaa/shared/services/shared.service';
@Component({
  selector: 'app-toaster-message',
  templateUrl: './toaster-message.component.html',
  styleUrls: ['./toaster-message.component.scss']
})
export class ToasterMessageComponent implements OnInit {

  toastertype: string = '';
  message: string = '';
  subscription: Subscription;
  constructor(
    private sharedService: SharedService,
  ) { 
    this.subscription = this.sharedService.getToaster().subscribe(data => {
      if(data?.message){
        this.toastertype = data.toastertype;
        this.message = data.message;
        setTimeout(() => {
          this.closeToaster();
        }, 3000);
      } else {
        this.toastertype = '';
        this.message = '';
      }
    });
  }

  ngOnInit(): void {
  }

  closeToaster(){
    this.sharedService.clearToaster();
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
