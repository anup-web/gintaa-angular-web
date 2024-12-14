import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-photo',
  templateUrl: './user-profile-photo.component.html',
  styleUrls: ['./user-profile-photo.component.scss']
})
export class UserProfilePhotoComponent implements OnInit {

  picture: string;

  constructor() { }

  ngOnInit(): void {}

}
