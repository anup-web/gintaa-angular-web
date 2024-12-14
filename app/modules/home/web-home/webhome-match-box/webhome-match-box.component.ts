import { Component, OnInit } from '@angular/core';
import { AuthService } from '@gintaa/core/services/auth.service';

@Component({
  selector: 'app-webhome-match-box',
  templateUrl: './webhome-match-box.component.html',
  styleUrls: ['./webhome-match-box.component.scss']
})
export class WebhomeMatchBoxComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
