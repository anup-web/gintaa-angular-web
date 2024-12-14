import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-close-cancel',
  templateUrl: './close-cancel.component.html',
  styleUrls: ['./close-cancel.component.scss']
})
export class CloseCancelComponent implements OnInit {
  @Output("closeModel") closeModel: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.closeModel.emit();
  }
}
