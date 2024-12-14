import { Injectable, Inject, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable ,Subject } from 'rxjs';
import { THEMES, ACTIVE_THEME, Theme } from './symbols';

@Injectable()
export class ThemeService {
  
  private subject = new Subject<any>();
  
 // public colorHexcode = new BehaviorSubject<string>('Color Code');
  themeChange = new EventEmitter<Theme>();

  constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string
  ) {
  }

  getActiveTheme() {
    const theme = this.themes.find(t => t.name === this.theme);
    if (!theme) {
      throw new Error(`Theme not found: '${this.theme}'`);
    }
    return theme;
  }

  setTheme(name: string) {
    this.theme = name;
    this.themeChange.emit( this.getActiveTheme());
  }

  SendcolorHexcode(colorHexcode: string) {
    this.subject.next({ cCode: colorHexcode });
  }

  getColorHexCode(): Observable<any> {
    return this.subject.asObservable();
  }

}
