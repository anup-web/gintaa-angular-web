import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-delivery-preference',
  templateUrl: './new-delivery-preference.component.html',
  styleUrls: ['./new-delivery-preference.component.scss']
})
export class NewDeliveryPreferenceComponent implements OnInit {

  @Input() dealDeliveryMethod: any;
  @Input() dealDetails: any;
  constructor() { }

  ngOnInit(): void {
  }

  getJintaaContact(phoneNumber:any){
    if(phoneNumber.phoneNumbers && Array.isArray(phoneNumber.phoneNumbers)){
      return phoneNumber.phoneNumbers.join(', ')
    } else {
      return '';
    }
  }

  directMeThere(){
    if(this.dealDetails?.junctionView){
      window.open('https://www.google.com/maps/dir/?api=1&destination=' +this.dealDetails?.junctionView?.latitude +',' +this.dealDetails?.junctionView?.longitude,'_blank')
    }
  }

}
