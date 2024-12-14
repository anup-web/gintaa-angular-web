import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as AllCategory from '@gintaa/core/models/Category';
import { CreateOfferService } from '@gintaa/modules/create-offer/services/create-offer.service';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs-compat/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-offer-category',
  templateUrl: './offer-category.component.html',
  styleUrls: ['./offer-category.component.scss']
})
export class OfferCategoryComponent implements OnInit {

  verticals$: Observable<AllCategory.Vertical[]>;
  rootCategories$: Observable<AllCategory.Category[]>;
  allSubCategories: AllCategory.Category[];
  allTags: AllCategory.CategoryTags[];

  constructor(
    private store: Store<gintaaApp.AppState>,
    private dialogRef: MatDialogRef<OfferCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) data,    
    private offerService: CreateOfferService,
  ) { 

    if(data) {
      // console.log('Data fetch::', data);
      this.verticals$ = of(data.verticals);  
      // console.log(this.verticals$)    
      // this.address = data.address;
    }
  }

  ngOnInit(): void {
    //const category = this.categories[0];    
  }

  fetchRootCategories(vertical: AllCategory.Vertical, index: number) {
    this.offerService.findRootCategories(vertical.verticalId)
    .pipe(
      tap((res) => {
        this.clearCategories();      
      })
    )
    .subscribe( res => this.rootCategories$ = of(res));    
  }

  fetchSubCategoriesByRootCategory(category: AllCategory.Category, index: number) {
    if(!('leafNode' in category) || ('leafNode' in category && !category.leafNode)) {
     this.offerService.findCategoryTree(category.categoryId)
     .pipe(
        tap(() => this.clearCategories())
      )
     .subscribe( res => this.allSubCategories = res);
    } 
    // else if('leafNode' in category && category.leafNode) {
    //   //this.itemTagPresent = true;
    //   this.offerService.getAllTagsByCategoryId(category.categoryId)
    //   .pipe(
    //     tap(() => this.clearCategories())
    //   )
    //   .subscribe( res => this.allTags = res); 
    // }
  }

  clearCategories() {
    this.allSubCategories = [];
    this.allTags = [];
  }

  onDialogClose() {
    this.dialogRef.close();
  }

}
