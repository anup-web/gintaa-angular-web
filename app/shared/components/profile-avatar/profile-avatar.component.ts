import { I } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent implements OnInit {

  constructor() { }
  @Input() userName: string = ' ';
  @Input() imageUrl: string;
  @Input() size: string;
  @Input() editProfile: boolean = false;
  @Input() bgColor: string = '#a7a7a7';
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  name: string 
  ngOnInit(): void {
    console.log("this.size",this.size);
    console.log("this.editProfile",this.editProfile);
    console.log("this.userName",this.userName);
    console.log("this.imageUrl",this.imageUrl);
    console.log("this.size",this.size);
    if(this.userName){
      const userNameTemp = this.userName.split(' ');
      this.name = userNameTemp[1] ? (userNameTemp[0] + ' ' + userNameTemp[1]) : userNameTemp[0];
      console.log("this.name",this.name);
    } else {
      this.name = ' ';
    }

    this.setDefaultImageForNoImage(this.imageUrl);
  }

  setDefaultImageForNoImage(imageUrl : string) {
    if(imageUrl && imageUrl.includes('deleted.jpeg')){
      this.imageUrl = this.userNoImage;
    }
  }

}
