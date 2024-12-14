import { Pipe, PipeTransform } from '@angular/core';
import { UploadResponse } from '../models';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
@Pipe({
  name: 'coverMatchImage'
})

export class FormatCoverMatchImagePipe implements PipeTransform {
  
  transform(images: UploadResponse, ...args: any[]): any {
    if (images && images.hasOwnProperty('url')) {
      return images?.url || '';
    } 
    return defaultNoImage || null;
  }
}
