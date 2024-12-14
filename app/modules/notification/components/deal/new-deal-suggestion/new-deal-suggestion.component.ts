import { Component, OnInit, Input } from '@angular/core';
import { FcmService } from '@gintaa/core/services/fcm.service';

@Component({
  selector: 'app-new-deal-suggestion',
  templateUrl: './new-deal-suggestion.component.html',
  styleUrls: ['./new-deal-suggestion.component.scss']
})
export class NewDealSuggestionComponent implements OnInit {

  dealDetails: any;
  @Input('input') data: any;
  constructor(private fcmService: FcmService) { }

  ngOnInit(): void {
     this.fcmService.getDealDetails(this.data.eventId).subscribe((data: any)=>{
       this.dealDetails = data.payload;
     })
  }

}
