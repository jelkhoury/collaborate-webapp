import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { SystemService, Department } from '../../services/system.service';

@Component({
    selector: 'manage-departments',
    templateUrl: './departments.component.html',
    providers: [SystemService]
})

export class ManageDepartmentsComponent {
    public departments: Department[];

    public departmentName;
    public valid = false;

    constructor(private systemService: SystemService) {
        this.getDepartments();
    }

    public addDepartment() {
        if (!this.isValidForm()) return;
        this.systemService.addDepartment(this.departmentName).subscribe(result => {
            this.getDepartments();
            this.departmentName = "";
        });
    }

    public getDepartments() {
        this.systemService.getDepartments().subscribe(result => {
            this.departments = result.json() as Department[];
        });
    }
    public isValidForm() {
        return this.departmentName;
    }
    
}

