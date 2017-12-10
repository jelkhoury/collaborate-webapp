import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ChatService } from './services/chat.service';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent {
  public isSigninCallback: boolean = false;

  constructor(private authService: AuthenticationService, private chatService: ChatService, private router: Router) {
    // on-login start chating
    this.authService.userLoggedIn$.subscribe(u => {
      this.chatService.start().subscribe(() => {
        this.chatService.register().subscribe(() => { });
      });
    });

    this.authService.userLoggedOut$.subscribe(() => {
      this.chatService.stop();
    });

    // when navigation ends, check if signin-callback
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSigninCallback = event.url.indexOf('signin-callback') > 0;
      }
    });
  }
}
