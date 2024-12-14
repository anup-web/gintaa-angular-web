import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist-edit',
  templateUrl: './wishlist-edit.component.html',
  styleUrls: ['./wishlist-edit.component.scss']
})
export class WishlistEditComponent implements OnInit {

  public searchKeyword: string = 'laptop';
  public selectedTags: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectedCustomTags(selectedTags: string[] = []) {
    // console.log('selectedTags:', selectedTags);
    // this.createItemOfferForm.get("customTags").setValue(selectedTags);
    // this.createItemOfferForm.get("customTags").updateValueAndValidity();
    this.selectedTags = selectedTags;
  }
  
}
