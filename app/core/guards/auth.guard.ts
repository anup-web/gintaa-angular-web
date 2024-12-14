import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { StorageService } from '@gintaa/core/services/storage.service';
import { Observable } from 'rxjs-compat/Observable';

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(
        private router: Router,
        private storageService: StorageService
    ) { }

    canLoad(route: Route): Observable<boolean> | boolean {
        const user = this.storageService.store;
        if(user && user.userId) {
            return true;
        } else {
            this.router.navigate(['/'])
        }
        // return this.fireAuth.authState
        // .pipe
        // (
        //     take(1),
        //     map((authState) => !!authState),
        //     tap((authenticated) => !authenticated ? this.router.navigate(['/']) : true)
        // );
    }

}
