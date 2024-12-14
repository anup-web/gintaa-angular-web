import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-close-succesfull',
  templateUrl: './close-succesfull.component.html',
  styleUrls: ['./close-succesfull.component.scss']
})
export class CloseSuccesfullComponent implements OnInit {

  @Output("closeModel") closeModel: EventEmitter<any> = new EventEmitter();
  @Output("rateDeal") rateDeal: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  clickRate(){
    this.rateDeal.emit()
  }
  
  close(){
    this.closeModel.emit();
  }

}
