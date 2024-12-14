import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultOwlOptions2 } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-store-slider',
  templateUrl: './store-slider.component.html',
  styleUrls: ['./store-slider.component.scss']
})
export class StoreSliderComponent implements OnInit {
  title = 'angularowlslider';
  @Input() gintaJunctions: any[];
  @Input() selectedGintaaJunctionId: string;
  @Input() currentdate: any = new Date();
  @Output("setJunctionDetails") setJunctionDetails: EventEmitter<any> = new EventEmitter();

  customOptions: OwlOptions = defaultOwlOptions2;
  constructor() { }

  ngOnInit() {
  }

  getPassedData(event) {
    if(event.startPosition === 0){
      let element = document.getElementById("arrow_left_store");
      element.classList.add("disabled");
      let element2 = document.getElementById("arrow_right_store");
      element2.classList.remove("disabled");
    } else {
      let element = document.getElementById("arrow_left_store");
      element.classList.remove("disabled");
      if(this.gintaJunctions.length == (event.startPosition + 1)){
        let element2 = document.getElementById("arrow_right_store");
        element2.classList.add("disabled");
      } else{
        let element2 = document.getElementById("arrow_right_store");
        element2.classList.remove("disabled");
      }
    }
  }

  onChange(junction:any){
    this.setJunctionDetails.emit(junction)
  }

}
