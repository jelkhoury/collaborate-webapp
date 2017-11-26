import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Gender, Department, MaritalStatus, User } from '../shared/models';

@Injectable()
export class RegistrationService {
    private url: string;
    private http: Http;

    constructor(http: Http, @Inject('API_URL') originUrl: string) {
        this.url = originUrl;
        this.http = http;
    }

    tempUploadProfileImageUrl(): string {
        return this.url + '/api/management/profile/picture/temp';
    }

    getTempProfilePictureUrl(tempId: string): string {
        return this.url + '/api/management/profile/picture/temp?fileId=' + tempId;
    }

    getUsers(filterText?: string): Observable<Response> {
        var url = this.url + '/api/management/users';
        if (filterText != null && filterText.trim().length > 0) {
            url += '?filter=' + filterText
        }

        return this.http.get(url);
    }

    getInitRegistrationModel(): Observable<Response> {
        return this.http.get(this.url + '/api/management/registration');
    }

    isUsernameAvailable(username: string): Observable<Response> {
        return this.http.get(this.url + '/api/management/username/available?username=' + username);
    }

    getEmailOwner(email: string): Observable<Response> {
        return this.http.get(this.url + '/api/management/email/owner?email=' + email);
    }

    register(username: string,
        password: string,
        email: string,
        nickname: string,
        firstName: string,
        lastName: string,
        maritalStatus: MaritalStatus,
        gender: Gender,
        birthDate: Date,
        departmentsIds: number[],
        positionId: number,
        employmentDate: Date): Observable<Response> {
        return this.http.post(this.url + '/api/management/registration', {
            Username: username,
            Password: password,
            Email: email,
            Nickname: nickname,
            FirstName: firstName,
            LastName: lastName,
            MaritalStatus: maritalStatus,
            Gender: gender,
            BirthDate: birthDate,
            DepartmentsIds: departmentsIds,
            PositionId: positionId,
            EmploymentDate: employmentDate
        });
    }
}