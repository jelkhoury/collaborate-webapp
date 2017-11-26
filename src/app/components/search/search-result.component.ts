import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../shared/models';

@Component({
    selector: 'my-profile',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css'],
    providers: [RegistrationService]
})
export class SearchResultComponent {
    public model: ViewModel;

    constructor(private registrationService: RegistrationService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            console.log(params);

            let filterText: string = params['key'];
            this.model = { users: null };

            this.registrationService.getUsers(filterText).subscribe(r => {
                this.model.users = r.json() as User[];
            });
        });
    }
}

class ViewModel {
    users: User[];
}