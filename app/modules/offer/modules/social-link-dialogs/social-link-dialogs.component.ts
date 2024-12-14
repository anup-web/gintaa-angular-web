import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { environment } from '@gintaa/env';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-social-link-dialogs',
  templateUrl: './social-link-dialogs.component.html',
  styleUrls: ['./social-link-dialogs.component.scss']
})
export class SocialLinkDialogsComponent implements OnInit {

  offerDetail: Offer;
  constructor(
    private dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.offerDetail = this.data.offerDetails;
  }

  shareOnSocialNetwork(site: string): void {
    let url: string = null;
    const currentUrl:string = `${environment.websiteUrl}/offer/share/${this.offerDetail.seOId}`;
    let encodeUrl = currentUrl.replace(/\(/g, "%28")
    encodeUrl = encodeUrl.replace(/\)/g, "%29")
    encodeUrl = encodeURIComponent(encodeUrl);
    
    switch (site) {
      case 'pinterest':
        url = `http://pinterest.com/pin/create/button/?url=${encodeUrl}`
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeUrl}`
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`
        break;
      case 'Whatsapp':
        url = `https://wa.me/?text=${encodeUrl}` 
        break;
      case 'Email':
        url = `mailto:?subject=${encodeURIComponent(this.title.getTitle())}&body=${encodeUrl}`
        break;
      default:
        break;
    }

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, "_blank");
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
