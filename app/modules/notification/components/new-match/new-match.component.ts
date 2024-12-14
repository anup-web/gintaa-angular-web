import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FcmService } from '@gintaa/core/services/fcm.service';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {

  offerDetails: any;
  @Input('input') data: any;
  constructor(private fcmService: FcmService,
    private router: Router) { }

  ngOnInit(): void {
     this.fcmService.getOfferMatchDetails(this.data.eventId).subscribe((data: any)=>{
       this.offerDetails = data.payload;
     })
  }

  clicOnkDetail(offerId){
    this.router.navigateByUrl(`/match/${offerId}`);
 }

}
