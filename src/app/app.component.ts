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
    public isFromSignin: boolean = false;

    constructor(private authService: AuthenticationService, private chatService: ChatService, private router: Router) {
        this.authService.userLoggedIn$.subscribe(u => {
            this.chatService.start().subscribe(() => {
                this.chatService.register().subscribe(() => { });
            });
        });

        this.authService.userLoggedOut$.subscribe(() => {
            this.chatService.stop();
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isFromSignin = event.url.indexOf('signin-callback') > 0;
            }
        });
    }
}
