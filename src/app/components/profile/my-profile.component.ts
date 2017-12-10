import { Component, OnInit } from '@angular/core';
import { Gender, MaritalStatus } from "../../shared/models";
import { ProfileService, UserProfile } from "../../services/profile.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css'],
    providers: [ProfileService, AuthenticationService]
})
export class MyProfileComponent implements OnInit {
    public model: EditProfileViewModel = new EditProfileViewModel();
    public accountSettings: AccountSettings = new AccountSettings();

    public formErrors = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        nickname: '',
        firstName: '',
        lastName: ''
    };

    constructor(private _profileService: ProfileService, private _authService: AuthenticationService) {

    }

    // get profile of current-user
    ngOnInit(): void {
        this._authService.getCurrentUserAsync().subscribe(u => {
            this._profileService.getProfileByUserId(u.profile.id).subscribe(up => {
                this.model.loadProfile(up);
                this.model.isLoading = false;
            });
        });
    }

    updateProfile() {
        this.model.isSubmitting = true;
    }
}

class EditProfileViewModel {
    nickname: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    maritalStatus: MaritalStatus;
    birthDate: Date;
    isLoading: boolean;
    isSubmitting: boolean;

    constructor() {
        this.isLoading = true;
        this.isSubmitting = false;
        this.gender = Gender.Male;
        this.maritalStatus = MaritalStatus.Unspecified;
    }

    loadProfile(profile: UserProfile) {
        this.nickname = profile.nickname;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.gender = profile.gender;
        this.maritalStatus = profile.maritalStatus;
        this.birthDate = profile.birthDate;
    }
}


class AccountSettings {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
