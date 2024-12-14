import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as MyOfferActions from '@gintaa/modules/my-offers/store/my-offer.actions';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-delete-draft-offer-popup',
  templateUrl: './delete-draft-offer-popup.component.html',
  styleUrls: ['./delete-draft-offer-popup.component.scss']
})
export class DeleteDraftOfferPopupComponent implements OnInit {

  draftId: string;
  constructor(
    private dialogRef: MatDialogRef<DeleteDraftOfferPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<gintaaApp.AppState>,
  ) { 
    this.draftId = data.id;
  }

  ngOnInit(): void {
  }

  dialogClose() {
    this.dialogRef.close();
  }

  deleteDraftOffer() {
    if (this.draftId) {
      this.store.dispatch(MyOfferActions.removeDraftOffer({ id: this.draftId }));
      this.dialogClose();
    }
  }

}
