import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FavoriteOffersEntityService } from './favorite-offers-entity.service';


@Injectable()
export class FavoriteOffersResolver implements Resolve<boolean> {

    constructor(private offerService: FavoriteOffersEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {
        this.offerService.clearCache();      
        return this.offerService.getAll()
        .pipe(
            map(favoriteoffers => !!favoriteoffers.length),
            first()
        );
    }
}
