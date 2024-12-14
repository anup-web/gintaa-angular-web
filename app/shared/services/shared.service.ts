import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AvailableBusinessRoles, BusinessRoleBasedActions } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  sharedToaster = new Subject<any>();
  constructor() { }

  showToaster(message:string, toastertype:string){
    this.sharedToaster.next({message, toastertype});
  }

  clearToaster() {
    this.sharedToaster.next();
  }

  getToaster(): Observable<any> {
    return this.sharedToaster.asObservable();
  }

  allowBusinessAction(action: string, role: AvailableBusinessRoles) {
    if (action) {
      const allowedRoles = BusinessRoleBasedActions[action].includes(role.toUpperCase());
      if (allowedRoles) {
        return true;
      }
    }
    return false;
  }
}
