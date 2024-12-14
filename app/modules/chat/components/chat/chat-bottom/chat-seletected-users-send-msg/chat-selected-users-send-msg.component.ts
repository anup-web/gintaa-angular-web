import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { chatOfferRoom } from '@gintaa/shared/models';

@Component({
  selector: 'app-chat-selected-users-send-msg',
  templateUrl: './chat-selected-users-send-msg.component.html',
  styleUrls: ['./chat-selected-users-send-msg.component.scss']
})
export class ChatSelectedUsersSendMsgComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any>= new EventEmitter();
  @Output() showChatSelectedUser: EventEmitter<any>= new EventEmitter();
  @Input('chatRooms') chatRooms: Array<chatOfferRoom>
  @Input('offerId') offerId: Array<chatOfferRoom>
  constructor() { }

  ngOnInit(): void {
    
  }

  close(){
    this.closeEvent.emit()
  }

  goToChatSelectedUser(){
    this.showChatSelectedUser.emit()
  }

}
