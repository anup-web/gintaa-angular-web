import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deal-status-view',
  templateUrl: './deal-status-view.component.html',
  styleUrls: ['./deal-status-view.component.scss']
})
export class DealStatusViewComponent implements OnInit {

  @Input('dealStatus') dealStatus: any;
  @Input('callerIsReceiver') callerIsReceiver: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
