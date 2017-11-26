import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../shared/models';

@Component({
    selector: 'manage-users',
    templateUrl: './users.component.html',
    providers: [RegistrationService, ProfileService]
})
export class ManageUsersComponent implements OnInit {
    public users: User[];
    private _usersService: RegistrationService;

    constructor(usersService: RegistrationService, private profileService: ProfileService) {
        this._usersService = usersService;
    }

    getProfilePictureUrl(pictureId: string): string {
        return this.profileService.getProfilePictureUrl(pictureId);
    }

    ngOnInit(): void {
        this._usersService.getUsers().subscribe(result => {
            this.users = result.json() as User[];
        });
    }
}


@Pipe({
    name: 'UsersPipe'
})

export class UsersPipe implements PipeTransform {
    private searchValue: String;
    transform(users: User[], searchValue: string) {
        if (searchValue) {
            searchValue = searchValue.toLowerCase();
            return users.filter(user => (user.username.toLowerCase().indexOf(searchValue) !== -1
                || user.profile.firstName.toLowerCase().indexOf(searchValue) !== -1
                || user.profile.lastName.toLowerCase().indexOf(searchValue) !== -1));


        } else {
            return users;
        }
    }
}

