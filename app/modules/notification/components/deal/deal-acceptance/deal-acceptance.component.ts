import { Component, OnInit, Input } from '@angular/core';
import { FcmService } from '@gintaa/core/services/fcm.service';

@Component({
  selector: 'app-deal-acceptance',
  templateUrl: './deal-acceptance.component.html',
  styleUrls: ['./deal-acceptance.component.scss']
})
export class DealAcceptanceComponent implements OnInit {

  dealDetails: any;
  @Input('input') data: any;
  constructor(private fcmService: FcmService) { }

  ngOnInit(): void {
     this.fcmService.getDealDetails(this.data.eventId).subscribe((data: any)=>{
       this.dealDetails = data.payload;
     })
  }

}
