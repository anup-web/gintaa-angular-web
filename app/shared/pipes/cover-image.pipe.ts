import { Pipe, PipeTransform } from '@angular/core';
import { UploadResponse } from '../models';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
@Pipe({
  name: 'coverImage'
})

export class FormatCoverImagePipe implements PipeTransform {
  
  transform(images: UploadResponse[], ...args: any[]): any {
    if (images.length) {
      return images.filter(image => image.cover === true)[0]?.url || images[0].url;
    } 
    return defaultNoImage || null;
  }
}
