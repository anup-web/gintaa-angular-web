import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@gintaa/core/services/auth.service';
import { FavoriteOffersEntityService } from '@gintaa/modules/offer/services/favorite-offers-entity.service';
import { GridViewConfig } from '@gintaa/shared/models/grid-view';
import { Offer } from '@gintaa/shared/models/offer';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-favorit-offers',
  templateUrl: './favorit-offers.component.html',
  styleUrls: ['./favorit-offers.component.scss']
})
export class FavoritOffersComponent implements OnInit {

  userFavoriteOffersDetail$: Observable<Offer[]>;

  favoriteOfferConfig: GridViewConfig = {
    title: `Favorite Offers `,
    actionButton: {
      flag: true,
      label: 'Back'
    },
    items: []
  };
  bredCrumbInput = [
    {
      name:'My Favorites',
      link:'/favorites',
      show: true,
      click: false,
    }
  ];

  constructor(
    private offerService: FavoriteOffersEntityService,
    private authService: AuthService,
    private router: Router
  ) {  }

  get isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.userFavoriteOffersDetail$ = this.offerService.entities$.pipe(
      tap(offers => this.favoriteOfferConfig.items.push(...offers))
    );   
    
  }

  naviagteToOfferDetail(id: string) {
    this.router.navigateByUrl(`/offer/${id}`);
  }

  fetchFavaritId(ids: any) {
    // console.log('fetchFavaritIds', ids);
  }

}
