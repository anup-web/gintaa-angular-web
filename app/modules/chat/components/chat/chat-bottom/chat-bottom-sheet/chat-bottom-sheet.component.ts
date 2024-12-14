import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { ChatMaximizePopupComponent } from '../chat-maximize-popup/chat-maximize-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { fadeAnimation } from 'projects/gintaa/src/app/animation';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-bottom-sheet',
  templateUrl: './chat-bottom-sheet.component.html',
  styleUrls: ['./chat-bottom-sheet.component.scss'],
  animations: [fadeAnimation]
})
export class ChatBottomSheetComponent implements OnInit {

  totalUnreadMsgCount: number = 0;
  componentDestroyed$: Subject<any> = new Subject();
  @ViewChild('openMediumChatWindow') openMediumChatWindow:ElementRef;
  @ViewChild('chatWindow') chatWindow:ElementRef;
  constructor(public chatService: ChatService,
    public matDialog: MatDialog,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.chatService.openChatWindow
    .pipe(
      takeUntil(this.componentDestroyed$)
    )
    .subscribe((type)=>{
        if(type === 'chatWindowOpen'){
          this.openMediumChatWindow.nativeElement.click();
        } else  if(type === 'close'){
          this.chatWindow.nativeElement.click();
        }
    },(error)=>{
      // console.log(error);
    })
  }

  back(){
    if(this.chatService.chatPopupPage === 'chat-user-list'){
      this.chatService.changeChatPoppupPage({
        chatPageType: 'chat-offer-deal'
      });
    } else if(this.chatService.chatPopupPage === 'chat-msg'){
      if(this.chatService.chatConnect && this.chatService.chatConnect.isOfferOwner)
      this.chatService.changeChatPoppupPage({
        chatPageType: 'chat-user-list'
      });
      else
      this.chatService.changeChatPoppupPage({
        chatPageType: 'chat-offer-deal'
      });
    } 
  }

  openChatMaximize(){
    //  const dialogRef = this.dialog.open(ChatMaximizePopupComponent,{
    //    width: '250px',
    //    data: {}
    //  })

    //  dialogRef.afterClosed().subscribe((res)=>{

    //  })
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '1100px';
    dialogConfig.data = {};
    //dialogConfig.panelClass = ['animate__animated','animate__slideInUp'];

    const modalDialog = this.matDialog.open(ChatMaximizePopupComponent, dialogConfig);

    this.changeModalType('large');
    modalDialog.afterClosed().subscribe((result) => {
      // do something with result
      if(result==='medium'){
        this.openMediumChatWindow.nativeElement.click();
      }
    });
  }

  changeModalType(type){
    this.chatService.changeChatModalType(type);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}



