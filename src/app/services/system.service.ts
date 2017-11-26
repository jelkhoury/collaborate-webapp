import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SystemService {
    private url: string;
    private http: Http;

    constructor(http: Http, @Inject('API_URL') originUrl: string) {
        this.url = originUrl;
        this.http = http;
    }

    getDepartments(): Observable<Response> {
        return this.http.get(this.url + '/api/system/departments');
    }

    addDepartment(departmentName: String): Observable<Response> {
        return this.http.post(this.url + '/api/system/department?departmentName=' + departmentName, null);
    }
}

export interface Department {
    id: number,
    title: string;
}