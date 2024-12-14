import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
import { GridViewConfig } from '@gintaa/shared/models/grid-view';

const defaultGridViewConfig: GridViewConfig = {
  title: 'Recomanded Offers',
  iconUrlConfig: {
    url: 'assets/images/recom-offer-icon.png',
    height: 35,
    width: 25,
    class: 'recom-image',
    flag: false
  },
  materialIconConfig: {
    flag: false,
    class: 'material-icons'
  },
  // isActionButton: false,
  actionButton: {
    label: 'view all',
    flag: false
  },
  items: []
}

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  noOfferImage = defaultNoImage;
  @Output() dataToEmit = new EventEmitter<any>();
  @Output() clickedImg: EventEmitter<string> = new EventEmitter<string>();
  @Output() clickedFavaritIcon: EventEmitter<string> = new EventEmitter<string>();
  @Input() viewConfig: GridViewConfig;
  @Input() isAuction: boolean;

  public favouritOfferIds: any = [];

  constructor() { }

  ngOnInit(): void {
    this.viewConfig = { ...defaultGridViewConfig, ...this.viewConfig };
  }

  emitEvent() {
    this.dataToEmit.emit('');
  }

  onClick(id: string) {
    this.clickedImg.emit(id)
  }

  makeFavourit(id: string) {
    // console.log('item', id);
  }

  isFavorite(id: string) {
    return false;
  }

}
