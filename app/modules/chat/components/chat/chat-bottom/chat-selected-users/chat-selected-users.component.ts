import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DeafaultChatProfiletNoImage, defaultNoImage } from '@gintaa/shared/configs/default.config';
import { chatOfferRoom } from '@gintaa/shared/models';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';

@Component({
  selector: 'app-chat-selected-users',
  templateUrl: './chat-selected-users.component.html',
  styleUrls: ['./chat-selected-users.component.scss']
})
export class ChatSelectedUsersComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectedUserEvent: EventEmitter<any> = new EventEmitter();
  @Input() allUserList: Array<chatOfferRoom>;
  selectedUserList: Array<any>= [];
  noImage = DeafaultChatProfiletNoImage.selectedUserSection;
  isAllChecked: boolean = false;
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    // this.allUserList = this.chatService.offerSelectedUserList.length >0 
    //                     ? this.chatService.offerSelectedUserList
    //                     : this.allUserList;
    // this.allUserList.map((room, key)=>{
    //   if(room.check)
    // })    
    this.selectUsersWithFiter();                
  }

  close(){
    this.closeEvent.emit()
  }

  next(){
    this.selectedUserEvent.emit(this.selectedUserList);
  }

  changeCheckbox(event,room,index){
    if(event.checked){
      room.checked = true;
      this.isAllChecked = this.allUserList.length === this.allUserList.filter((room: any)=> room.checked).length;
    } else {
      this.isAllChecked = false;
      room.checked = false;
    }
    this.selectUsersWithFiter();
  }

  selectAll(event){
    if(event.checked){
      this.isAllChecked = true;
      this.allUserList.map((room: any)=>{
         room.checked = true;
      })
    } else {
      this.isAllChecked = false;
      this.allUserList.map((room: any)=>{
        room.checked = false;
     })
    }
    this.selectUsersWithFiter();
  }

  selectUsersWithFiter(){
    this.selectedUserList = this.allUserList.filter((room: any)=> room.checked)
    this.chatService.offerSelectedUserList = this.selectedUserList;
  }

}
