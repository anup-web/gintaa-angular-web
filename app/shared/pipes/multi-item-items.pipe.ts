import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'multiItemItems'
})

export class MultiItemItemsPipe implements PipeTransform {
    transform(value: any =0 , ...args: any[]): any {
        return  value > 1 ? 's' : '';
    }
}
