import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'signin-callback',
    templateUrl: './signin-callback.component.html'
})
export class SigninCallbackComponent {
    constructor(private authService: AuthenticationService) {
        this.authService.continueSignin();
    }
}