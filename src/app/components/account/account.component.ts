import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  providers: [ProfileService]
})
export class AccountComponent {
  private accountSettings: AccountSettings = new AccountSettings();
  private isSaving: boolean = false;

  constructor(private _profileService: ProfileService) {

  }

  changePassword() {
    if (this.isSaving) {
      return;
    }
    // validation
    if (!this.accountSettings.newPassword) {

      return;
    }
    if (this.accountSettings.currentPassword !== this.accountSettings.confirmPassword) {

      return;
    }
    // end-validation

    this.isSaving = true;
    var self = this;

    this._profileService.changePassword(this.accountSettings.currentPassword, this.accountSettings.newPassword).subscribe(o => {
      self.isSaving = false;
    });
  }
}

class AccountSettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
