import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from '@gintaa/core/services/storage.service';
import { Observable } from 'rxjs-compat/Observable';

@Injectable()
export class BusinessAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private storageService: StorageService
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // throw new Error('Method not implemented.');
        const user = this.storageService.store;
        if (user && user.userId) {
            let selectedBusiness: any = this.storageService.getSelectedBusiness();
            if (selectedBusiness && selectedBusiness?.businessId) {
                return true;
            } else {
                this.router.navigate(['/']);
            }
        } else {
            this.router.navigate(['/']);
        }
    }

    // canLoad(route: Route): Observable<boolean> | boolean {
    //     const user = this.storageService.store;
    //     if (user && user.userId) {
    //         let selectedBusiness: any = this.storageService.getSelectedBusiness();
    //         if (selectedBusiness && selectedBusiness?.businessId) {
    //             return true;
    //         } else {
    //             this.router.navigate(['/']);
    //         }
    //     } else {
    //         this.router.navigate(['/']);
    //     }
    // }

}
