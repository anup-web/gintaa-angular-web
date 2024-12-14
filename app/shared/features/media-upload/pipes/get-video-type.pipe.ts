import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getVideoType'
})
export class GetVideoTypePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let valueArr: any[] = (value) ? value.split('.') : []

    return (valueArr.length) ? 'video/' + valueArr[valueArr.length-1] : "";
  }

}
