import { Component, Input, OnInit } from '@angular/core';


const defaultBreadCrumbInput = {
  text: 'Recommended Offers',
  fragment: 'recommended',
  link: null,
  currentPage: {
    show: true,
    text: 'All',
    link: null,
  }
}
@Component({
  selector: 'app-bread-crumbs-all',
  templateUrl: './bread-crumbs-all.component.html',
  styleUrls: ['./bread-crumbs-all.component.scss']
})
export class BreadCrumbsAllComponent implements OnInit {

  @Input('bredCrumbInput') bredCrumbInput: any;
  constructor() { }

  ngOnInit(): void {
    this.bredCrumbInput = { ...defaultBreadCrumbInput, ...this.bredCrumbInput}
  }

}
