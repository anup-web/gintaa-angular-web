import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';

@Injectable({
  providedIn: 'root'
})
export class IsEnableAuctionGuard implements CanLoad {
  isEnableAuction: boolean = false;
  constructor(
    private firebseStaticService: FirebaseStaticContentService
  ) { 
    this.isAuctionEnable();
  }
  
  canLoad(route: Route): Observable<boolean> | boolean {
    // return true;
    return this.isEnableAuction;
  }

  async isAuctionEnable() {
    this.isEnableAuction = await this.firebseStaticService.isEnableAuction();
  }
}
