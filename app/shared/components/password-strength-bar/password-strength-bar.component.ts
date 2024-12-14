import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { APP_CONFIGS } from '@gintaa/config/enum.config';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss']
})
export class PasswordStrengthBarComponent implements OnInit, OnChanges {

  @Input() passwordToCheck: string;
  @Input() barLabel: string;

  barLabelDefault = 'Password strength :';
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;

  private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
  showLog = false;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    var password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');
    if (password) {
      let c = this.getColor(PasswordStrengthBarComponent.measureStrength(password));
      this.setBarColors(c.idx, c.col);
    }
  }

  private setBarColors(count: number, col) {
    for (let _n = 0; _n < count; _n++) {  
      this['bar' + _n] = col;  
    }
  }

  private getColor(score: number) {
    let idx = 0;
    if (score > 90) { idx = 4; }
    else if (score > 70) { idx = 3; }
    else if (score >= 40) { idx = 2; }
    else if (score >= 20) { idx = 1; }

    return {
      idx: idx + 1,
      col: this.colors[idx]
    };
  }

  private static measureStrength(pass: string) {
    const showLog = false;
    const regexHasUppercaseChar: RegExp = new RegExp(APP_CONFIGS.HAS_UPPERCASE_CHAR);
    const regexHasLowercaseChar: RegExp = new RegExp(APP_CONFIGS.HAS_LOWERCASE_CHAR);
    let score = 0;

    // award every unique letter until 5 repetitions
    let letters = {};
    for (let i = 0; i< pass.length; i++) {
      if (showLog) { 
        // console.log('Pass Strength: ', score); 
      }
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: regexHasLowercaseChar.test(pass),
      upper: regexHasUppercaseChar.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += (variations[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }
}
