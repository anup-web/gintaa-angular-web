import {
  Component, Input, OnInit
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export interface ISpinnerConfig {
  loaderType?: string;
  fullPage?: boolean;
  loaderColor?: string;
  backDropColor?: string;
  loadingMessage?: string;
  loaderSize?: string;
  loader: boolean;
  template?: string;
}

@Component({
  selector: 'app-media-spinner',
  templateUrl: './media-spinner.component.html',
  styleUrls: ['./media-spinner.component.scss'],
})
export class MediaSpinnerComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  defaultSpinnerConfig = {
    loaderType: 'line-scale-pulse-out',
    fullPage: true,
    loaderColor: '#fff',
    backDropColor: 'rgba(6,255,218,0.79)',
    loadingMessage: 'Loading....',
    loaderSize: 'large',
    loader: false,
    template: null
  }
  _spinnerConfig: ISpinnerConfig = this.defaultSpinnerConfig;
  _time: number = 5000;

  @Input()
  set timeOut(timeOut: number) {
    this._time = timeOut;
  }

  @Input()
  set spinnerConfig(config: ISpinnerConfig) {
    this._spinnerConfig = {
      ...this.defaultSpinnerConfig,
      ...config
    }
  }

  @Input()
  set fullPage(fullPage: boolean) {
    this._spinnerConfig = {
      ...this.defaultSpinnerConfig,
      fullPage
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, this._time);
  }

}
