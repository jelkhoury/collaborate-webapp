import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: 'silent-renew-callback',
    templateUrl: './silent-renew-callback.component.html'
})
export class SilentRenewCallbackComponent implements OnInit {

    constructor(private _authService: AuthenticationService) {

    }

    ngOnInit(): void {
        this._authService.continueSilentRenew();
    }
}