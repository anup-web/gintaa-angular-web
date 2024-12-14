import { Component, OnInit } from '@angular/core';
import { AuthService } from '@gintaa/core/services';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public appDownloadLinks: any;
  isChatWindowOpen: boolean = false;

  constructor(
    private authService: AuthService,    
    private firebseStaticService: FirebaseStaticContentService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.getBannersData();
    this.chatService.openChatWindow.subscribe((res)=>{
       this.isChatWindowOpen = res !== 'close';
    })

  }

  async getBannersData() {
    this.appDownloadLinks = await this.firebseStaticService.getFooterDownloadOurApp();   
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
