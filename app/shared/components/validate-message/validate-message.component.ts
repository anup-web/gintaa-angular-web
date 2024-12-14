import { 
  Component, 
  OnInit, 
  Input, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef 
} from '@angular/core';

@Component({
  // selector: 'app-validate-message',
  templateUrl: './validate-message.component.html',
  styleUrls: ['./validate-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateMessageComponent implements OnInit {

  _text;
  _hide = true;

  @Input() set text(value) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

}
