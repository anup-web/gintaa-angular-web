import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-notification',
  templateUrl: './common-notification.component.html',
  styleUrls: ['./common-notification.component.scss']
})
export class CommonNotificationComponent implements OnInit {

  @Input('tabEventLists') tabNotifyEventLists: any[];

  
  constructor() { }

  ngOnInit(): void {
    // console.log('tabNotifyEventLists:', this.tabNotifyEventLists);
  }

  ngOnChanges(changes: any) {
    // console.log('changes:', changes);    
  }

  enableDesableEvent(index: number){
    // console.log('index', index);
    
    // console.log('index', this.tabNotifyEventLists);
    let currentStatus: boolean = this.tabNotifyEventLists[index].activeStatus;

    // console.log('currentStatus', currentStatus);

    // this.tabNotifyEventLists[index].activeStatus = currentStatus ? false : true;
  }

  enableDesableNotifyType(eventIndex: number, optIndex: number){
    let activeStatus = this.tabNotifyEventLists[eventIndex].options[optIndex].activeStatus;
    this.tabNotifyEventLists[eventIndex].options[optIndex].activeStatus = !activeStatus;
  }

}
