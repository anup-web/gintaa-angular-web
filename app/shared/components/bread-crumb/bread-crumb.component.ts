import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  // breadcrumbList
  // bredCrumbInput

  @Input() breadcrumbs: any[];
  @Output("onClickBreadCrumb") onClickBreadCrumb: EventEmitter<any> = new EventEmitter();
  defaultBreadCrumbInput = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.breadcrumbs = [...this.defaultBreadCrumbInput, ...this.breadcrumbs];
    //console.log("==========this.breadcrumbs",this.breadcrumbs ,this.defaultBreadCrumbInput);
  }

  onClick(link: any) {
    this.onClickBreadCrumb.emit(link);
    if(link.link.includes('/category')){ 
      this.router.navigate(['/category'], { 
        queryParams: { 
          searchText: link.name 
        }
      })
    } else {
     
    }
  }

}
