import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingComponent implements OnInit {

  /****
   * Available types:
   * default | elipsis | stampede
  */

  @Input() type: string = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
