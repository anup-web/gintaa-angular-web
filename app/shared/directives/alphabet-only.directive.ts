import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnly]'
})

export class AlphabetOnlyDirective {
  key;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.key;
    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(this.key)) {
      event.preventDefault();
    }
  }
}
