import { Pipe, PipeTransform } from '@angular/core';
import { chatDealMessage, ChatMessageTypeEnums, chatOfferMessage } from '../models';

@Pipe({
  name: 'chatMessage'
})
export class chatMessagePipe implements PipeTransform {

  transform(message: chatOfferMessage | chatDealMessage, ...args: any[]): string {
    if(message.messageType === ChatMessageTypeEnums.HTML){
      return ` ${message.messageBody}`;
    } else if(message.messageType === ChatMessageTypeEnums.IMAGE){
      const msg = message.messageBody || 'Photo';
      return `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5"> image </span> ${msg}`
    } else if(message.messageType === ChatMessageTypeEnums.VIDEO){
      const msg = message.messageBody || 'Video';
      return  `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      smart_display
      </span> ${msg}`
    } else if(message.messageType === ChatMessageTypeEnums.AUDIO){
      const msg = message.messageBody || 'Audio';
      return  `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      headphones
      </span> ${msg}`
    } else if(message.messageType === ChatMessageTypeEnums.FILE){
      const msg = message.messageBody || 'File';
      return  `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      article
      </span> ${msg}`
    } else if(message.messageType === ChatMessageTypeEnums.OFFER){
      const msg = message.messageBody || 'Offer';
      return  `<span class="material-icons-outlined gt-fs-18 gt-mr-5 gt-ml-5">
      local_offer
      </span> ${msg}`
    }
  }

}
