import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '@gintaa/core/services';
import { UserReportBlockComponent } from '@gintaa/modules/profile/components/profile/user-report-block/user-report-block.component';
import { ProfileService } from '@gintaa/modules/profile/services/profile.service';
import { DeafaultChatProfiletNoImage, defaultNoImage } from '@gintaa/shared/configs/default.config';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {

  noImage = defaultNoImage;
  isSearchShow: boolean = false;
  loggedInUserId: string;
  userStatus: string = '';
  isChatConnected$: Subscription;
  recipientId: string;
  
  constructor(public matDialog: MatDialog,
    public chatService: ChatService,
    private authService: AuthService,
    private profileService: ProfileService,
    private sharedService: SharedService) {
    }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.currentUserId;
    this.isChatConnected$ = this.chatService.isChatConnected.subscribe((res)=>{
      this.getUserStatus(this.chatService.chatConnect.recipientId);
      this.recipientId = this.chatService.chatConnect.recipientId;
    })
  }
  
  openBlockUserDialog(type: 'block' | 'report') {
    const profileData = {
      userId: this.recipientId,
      images: [this.chatService.chatConnect.receipentImage],
      displayName: this.chatService.chatConnect.receipentName
    }
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '100px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {
      profileData: profileData,
      opType: type
    };


    const observale = type === 'block' ? this.profileService.checkAlreadyCallerHasBlockedUser(profileData.userId) : this.profileService.checkAlreadyCallerHasReportedUser(profileData.userId)

    observale
      .subscribe((res: any) => {
        // console.log(res);
        if(!res.payload){
          const modalDialog = this.matDialog.open(UserReportBlockComponent, dialogConfig);
          modalDialog.afterClosed().subscribe((results) => {
            // do something with results
            if(results){
              this.sharedService.showToaster(results?.msg, 'success');
            }
            
          });
        } else {
          this.sharedService.showToaster('User already reported by you', 'success');
        }
      }, (err)=>{
        // console.log(err); 
      })

    
  }

  unBlockChat(){
    // const blockUserId = this.chatService.chatConnect.recipientId;
    // this.chatService.blocUnblockkUser({
    //   chatType: this.chatService.chatType,
    //   blockUserId: blockUserId
    // });
    this.profileService.unBlockUserProfile(this.recipientId)
    .subscribe((res)=>{
      this.chatService.loggedInUserAllStatus.alreadyCallerHasBlockUser = false;
    },(err)=>{
      // console.log(err);
    })
  }

  clearHistory(){
    const userId = this.authService.currentUserId;
    this.chatService.clearHistoryForCurrentUser({
      chatType: this.chatService.chatType,
      userId: userId
    });
  }

  showrUserImage(){
    return this.chatService.chatConnect?.receipentImage || DeafaultChatProfiletNoImage.msgSection;
  }

  getUserStatus(userId: string){
   this.chatService.getOfflineOnlineStatus(userId).subscribe((res)=>{
        this.userStatus = res?.state;
   }, (err)=>{
    //  console.log(err);
   })
  }


  ngOnDestroy(){
    this.isChatConnected$.unsubscribe();
  }

  

}