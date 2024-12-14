import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: 'input[numbersOnly],textarea[numbersOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }  

    @HostListener('paste', ['$event']) 
    onPaste(event: ClipboardEvent) {
      // Don't allow pasted text that contains non-numerics
      const clipboardData = event.clipboardData || (window as any).clipboardData;
      const pastedText = clipboardData.getData('Text');
      if (pastedText) {
        const regEx: RegExp = new RegExp('^[0-9]*$');
        if (!regEx.test(pastedText)) {
          event.preventDefault();
        } 
    }
  }

  @HostListener('keypress', ['$event'])
    keyPressEvent(event: KeyboardEvent) {
        if (event.key.length === 1 && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    }

}