import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import localization from '@gintaa/config/localization';
import { UserProfileResponse, ReportRequest } from '@gintaa/core/models';
import { ProfileService } from '@gintaa/modules/profile/services/profile.service';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { Observable } from 'rxjs-compat/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-report-block',
  templateUrl: './user-report-block.component.html',
  styleUrls: ['./user-report-block.component.scss']
})
export class UserReportBlockComponent implements OnInit {

  profileData: UserProfileResponse;
  reportRequest: ReportRequest = {
    questionAndAnswers: [],
    comment: null,
    reportToGintaa: true,
    blockUser: false
  }
  questionList: Array<any> = [];
  errorMessage: string;
  opType: 'block' | 'report';
  loggedInUserAllStatus: {
    alreadyReportedOtherUser: boolean,
    alreadyCallerHasBlockUser: boolean,
    alreadyCallerIsBlockedByUser: boolean,
    alreadyBothBlocked: boolean
  } = {
  alreadyReportedOtherUser: false,
  alreadyCallerHasBlockUser: false,
  alreadyCallerIsBlockedByUser: false,
  alreadyBothBlocked: false
}

  constructor(
    public matDialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data,
    private profileService: ProfileService,
    private chatService: ChatService,
    private sharedService: SharedService
  ) {
    if(data){
      this.profileData = data.profileData;
      this.opType = data.opType || 'report'
      if(this.opType === 'block') {
        this.reportRequest.blockUser = true;
        this.reportRequest.reportToGintaa = false;
      }
    }
  }

  ngOnInit(): void {
    this.checkAllStatus();
    this.getAllReportCategories();
  }

  closeModel(){
    this.matDialog.close();
  }

  getFirstName(name){
    if (name) {
      return name.split(' ')[0];
    } else {
      return name;
    }
  }

  onchangeReport(event:any, type:string) {
    if(type=='gintaa'){
      if(event.checked){
        this.reportRequest.reportToGintaa = true;
      } else{
        this.reportRequest.reportToGintaa = false;
      }
    } else{
      if(event.checked){
        this.reportRequest.blockUser = true;
      } else{
        this.reportRequest.blockUser = false;
      }
    }
  }

  calcelBlock(){
    this.matDialog.close();
  }

  blockUser() {
    let isValidForm = false;
    this.errorMessage = 'Select a reason to report user.';
    if (this.reportRequest.blockUser) {
      isValidForm = true;
    }
    if (this.reportRequest.blockUser) {
      isValidForm = true;
    }
    let selectedCategory = this.questionList.filter((item)=>item.selected).map((item)=>item.categoryName);
    if ((this.opType === 'block' || (selectedCategory && selectedCategory.length > 0))&& this.reportRequest.comment) {
      isValidForm = true;
    } else {
      isValidForm = false;
      this.errorMessage = 'Please put a comment & select at least one category.';
    }
   
    if (isValidForm) {
      this.errorMessage = '';
      const input = {
        userId : this.profileData.userId,
        report : this.reportRequest.reportToGintaa,
        block : this.reportRequest.blockUser,
        comments : this.reportRequest.comment,
        reportCategoryNames :  selectedCategory
      }  
      this.profileService.blockUserProfile(input)
      .subscribe((res)=>{
        // console.log(res);
        let msg = '';
        if(this.opType === 'block' || this.reportRequest.blockUser){
          msg = localization.user.BLOCK_USER;
          this.chatService.loggedInUserAllStatus.alreadyCallerHasBlockUser = true;
        }
        if(this.opType === 'report'){
          msg = localization.user.REPORT_OTHER_USER;
          if(this.reportRequest.blockUser)
            msg = localization.user.REPORT_AND_BLOCK_USER;
          this.chatService.loggedInUserAllStatus.alreadyReportedOtherUser = true;  
        }
        this.matDialog.close({msg});                                                             
      },(err)=>{
        // console.log(err);
        this.sharedService.showToaster(localization.user.REPORT_USER_ERR, 'warning');
      })
    }
  }

  getAllReportCategories(){
    this.profileService.getReportCategories()
    .subscribe(res => {
      this.questionList = res["payload"] ? res["payload"] : [];
    }, (err)=>{
      // console.log(err); 
    })
  }

  checkAllStatus(){
    this.profileService.checkAlreadyCallerHasReportedUser(this.profileData.userId)
      .subscribe((res: any) => {
        // console.log(res);
        this.loggedInUserAllStatus.alreadyReportedOtherUser = res.payload;
      }, (err)=>{
        // console.log(err); 
    })

    this.profileService.checkAlreadyCallerHasBlockedUser(this.profileData.userId)
      .subscribe((res: any) => {
        // console.log(res);
        this.loggedInUserAllStatus.alreadyCallerHasBlockUser = res.payload;
      }, (err)=>{
        // console.log(err); 
    })

    this.profileService.checkAlreadyCallerIsBlockedByUser(this.profileData.userId)
      .subscribe((res: any) => {
        // console.log(res);
        this.loggedInUserAllStatus.alreadyCallerIsBlockedByUser = res.payload;
      }, (err)=>{
        // console.log(err); 
    })

    this.profileService.checkAlreadyBlockByEachOther(this.profileData.userId)
      .subscribe((res: any) => {
        // console.log(res);
        this.loggedInUserAllStatus.alreadyBothBlocked = res.payload;
      }, (err)=>{
        // console.log(err); 
    })
  }

}
