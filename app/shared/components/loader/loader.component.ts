import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoadingSpinnerComponent {

  // Input props
  @Input() loader: boolean;
  @Input() loaderType: string = 'skelton';
  @Input() fullPage: boolean;
  @Input() loaderColor: string = 'default';
  @Input() loaderPosition: string = 'center';
  @Input() addBackDrop: boolean = true;
  @Input() backDropColor: string = '#000000';
  @Input() loadingMessage: string = null;

  fullPageTemp: boolean = false;
  backDropOpacity: string = '80%';
  showLoadingMessage: boolean = true;

  constructor() {
    // console.log('[INSIDE LOADER COMPONENT]');
  }

  ngOnInit(): void {
    this.fullPageTemp = this.fullPage;
    // update the backdrop color
    if (this.backDropColor === 'dark') {
      this.backDropColor = '#000000';
    } else if (this.backDropColor === 'light') {
      this.backDropColor = '#ffffff';
    }

    // backdrop color validation
    if (!this.backDropColor.startsWith('#')) {
      this.backDropColor = '#000000';
    }

    // loading message
    if (!this.loadingMessage) {
      this.loadingMessage = ''
    }
  }

}
