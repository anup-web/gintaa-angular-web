import { Component, OnInit, Input } from '@angular/core';
import { FcmService } from '@gintaa/core/services/fcm.service';

@Component({
  selector: 'app-success-deal-close',
  templateUrl: './success-deal-close.component.html',
  styleUrls: ['./success-deal-close.component.scss']
})
export class SuccessDealCloseComponent implements OnInit {

  dealDetails: any;
  @Input('input') data: any;
  constructor(private fcmService: FcmService) { }

  ngOnInit(): void {
     this.fcmService.getDealDetails(this.data.eventId).subscribe((data: any)=>{
       this.dealDetails = data.payload;
     })
  }

}
