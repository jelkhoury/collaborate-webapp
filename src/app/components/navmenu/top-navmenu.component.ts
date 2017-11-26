import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
    selector: 'top-nav-menu',
    templateUrl: './top-navmenu.component.html',
    styleUrls: ['./top-navmenu.component.css']
})

export class TopNavMenuComponent implements OnInit {
    private isNavbarCollapsed: boolean = true;
    public model: ViewModel = new ViewModel();

    constructor(private authService: AuthenticationService, private chatService: ChatService, private router: Router) {
    }

    ngOnInit(): void {
        this.authService.getCurrentUserAsync().subscribe(u => {
            this.model = {
                username: u ? u.profile.name : '',
                isAdmin: u && u.profile.username == 'jek',
                searchText: ""
            }
        });
    }
    logout() {
        this.authService.logout();
    }
    globalSearch(): void {
        this.router.navigateByUrl("/search?key=" + this.model.searchText);
    }
}

class ViewModel {
    isAdmin: boolean;
    username: string;
    searchText: string;

    constructor() {
        this.isAdmin = false;
        this.username = '';
        this.searchText = '';
    }
}
