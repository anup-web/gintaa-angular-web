import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@gintaa/core/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  dealRefId: string;
  dealDetails: any = null;
  deliverydate:any;
  status: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/home']);
    }
    this.route.paramMap.subscribe(params => {
      this.dealRefId = params.get("id");
      this.status = history.state.status;
      this.deliverydate = history.state.deliverydate;
      const days = parseInt(history.state.deliverydate);
      this.deliveredBy(days);
      this.dealDetails = history.state.data;
      if(!this.dealDetails?.dealRefId){
        this.trackOrder();
      }
    });
  }
  
  deliveredBy(days){
    try{
      if(!isNaN(days)){
        this.deliverydate = moment().add(days, 'days').format("Do MMMM");
      } else {
        this.deliverydate = moment().add(5, 'days').format("Do MMMM");
      }
    } catch(e){
    }
  }

  navigateToOffer(offerId) {
    try{
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/offer/${offerId}`])
      );
      window.open(url, '_blank');
    } catch(err){
    }
  }

  trackOrder(){
    try{
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/deals/order-details/${this.dealRefId}`])
      );
      window.open(url, '_parent');
    } catch(err){
    }
  }

}
