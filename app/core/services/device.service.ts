import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import uid from 'uid';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private cookieService: CookieService) { }

  get deviceId() {
    const deviceId: string = this.cookieService.get('_deviceId') ? this.cookieService.get('_deviceId') : `gintaa${uid()}`;
    return deviceId;
  }
}
