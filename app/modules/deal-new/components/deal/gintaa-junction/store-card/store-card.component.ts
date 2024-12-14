import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss']
})
export class StoreCardComponent implements OnInit {
  @Input() junction: any;
  @Input() selectedGintaaJunctionId: string;
  @Output("onChange") onChange: EventEmitter<any> = new EventEmitter();
  junctiondetails: any = { 'openTime': '', 'closeTime': '', 'currentState': 'CLOSED' };
  junctionDays: any = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  _currentdate: any = new Date();
  get currentdate(): any {
    return this._currentdate;
  }
  @Input() set currentdate(newFlag: any) {
    this._currentdate = newFlag;
    this.updateTimings();
  }

  constructor() { }

  ngOnInit() {
  }

  onSelectStore(store) {
    this.onChange.emit(store);
  }

  updateTimings() {
    const day1 = this._currentdate.getDay();
    if (this.junction?.junctionTimings && this.junction.junctionTimings[this.junctionDays[day1]]) {
      const today = this.junction.junctionTimings[this.junctionDays[day1]];
      this.junctiondetails['openTime'] = today.openTime ? this.formatJunctionOpenCloseTime(today.openTime) : '';
      this.junctiondetails['closeTime'] = today.closeTime ? this.formatJunctionOpenCloseTime(today.closeTime) : '';
      this.junctiondetails['currentState'] = 'OPEN';
    } else {
      this.junctiondetails['currentState'] = 'CLOSED';
    }
  }

  formatJunctionOpenCloseTime(junctionTime: string): string {
    // expecting in 24 hour format - 01:00:00
    let time = junctionTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [junctionTime];
    if (time.length > 1) {
      time = time.slice(1);
      time[4] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = String(+time[0] % 12 || 12);
    }
    return time.join('');
  }

}
