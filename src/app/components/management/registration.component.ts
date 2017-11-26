import { Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Gender, MaritalStatus, Position, Department } from '../../shared/models';
import { DropdownOption, DropdownComponent } from '../../shared/components/dropdown.component';
import { MultiDropdownOption, MultiDropdownComponent } from '../../shared/components/multi-dropdown.component';
//import { UploadOutput, UploadInput, UploadFile } from 'ngx-uploader';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    providers: [RegistrationService, FormBuilder]
})

export class RegistrationComponent {
    public model: RegistrationModel; // binding model
    public formErrors = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        nickname: '',
        firstName: '',
        lastName: ''
    };

    private hasError: boolean = false;
    private isSubmitted = false;
    private currentForm: NgForm;
    @ViewChild('f') newForm: NgForm;
    private initModel: InitRegistrationModel;

    constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder) {
        this.loadModel();
    }

    loadModel() {
        this.model = new RegistrationModel();
        this.registrationService.getInitRegistrationModel().subscribe(m => {
            this.initModel = m.json() as InitRegistrationModel;

            // create departments options
            this.model.departmentsOptions = new Array<MultiDropdownOption>();
            this.initModel.departments.forEach(d => {
                this.model.departmentsOptions.push({
                    id: d.id,
                    name: d.name
                });
            });

            // create positions options
            this.model.positionsOptions = new Array<DropdownOption>();
            this.initModel.positions.forEach(p => {
                this.model.positionsOptions.push({
                    id: p.id,
                    name: p.title
                });
            });
        });
    }
    // when view value changes
    ngAfterViewChecked() {
        if (this.currentForm === this.newForm) { return; }
        this.currentForm = this.newForm;

        if (this.currentForm) {
            this.currentForm.valueChanges.subscribe(data => this.onValueChanged(data));
        }
    }
    // when form value changes
    onValueChanged(data?: any) {
        if (!this.currentForm) { return; }
        const form = this.currentForm.form;
        this.hasError = false;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && (control.dirty || control.touched || this.isSubmitted)) {
                if (!control.valid) {
                    this.formErrors[field] = this.getValidationMessage(field);
                    this.hasError = true;
                }

                if ((field == 'password' || field == 'confirmPassword') && this.model.password != this.model.confirmPassword) {
                    this.formErrors.confirmPassword = '"Confirm Password" should match the "Password"';
                    this.hasError = true;
                }
            }
        }
    }
    // get validation message by field name
    getValidationMessage(field: string): string {
        if (field == 'username') {
            return 'Username is required';
        }
        else if (field == 'password') {
            return 'Password is required and should match the Confirm Password';
        }
        else if (field == 'confirmPassword') {
            return 'Confirm Password is required and should match the Password';
        }
        else if (field == 'email') {
            return field ? 'Invalid Email' : 'Email is required';
        }
        else if (field == 'nickname') {
            return 'A Nickname is required';
        }
        else if (field == 'firstName') {
            return 'First Name is required';
        }
        else if (field == 'lastName') {
            return 'Last Name is required';
        }
    }
    // register click
    onRegister(): void {
        this.model.isSubmitting = true;
        var submittingFinished = () => {
            this.model.isSubmitting = false;
        };

        this.isSubmitted = true;
        // call for validation
        this.onValueChanged();
        if (this.hasError) {
            submittingFinished();
            return;
        }
        if (this.model.isUsernameAvailable == false) {
            submittingFinished();
            alert('Username already in use');
            return;
        }
        if (this.model.emailOwner) {
            submittingFinished();
            alert('This email is already registered');
            return;
        }

        var user = this.model;

        //var tempPictureId = this.file != null ? this.file.response : "";
        // register the user and redirect to all users
        this.registrationService.register(user.username, user.password, user.email, user.nickname, user.firstName, user.lastName, user.maritalStatus, user.gender, user.birthDate, user.departmentIds, user.positionId, user.employmentDate)
            .subscribe(r => {
                alert('Account registered successfully');
            }, e => {
                if (e._body == "9000000") {
                    alert('Username/Email already in use');
                }
                else {
                    alert('Registration error');
                }
            }).add(() => {
                submittingFinished();
            });
    }
    // validate the username is available
    validateUsernameAvailable(): void {
        this.model.isUsernameAvailable = true;
        this.model.validatedUsername = "";
        if (this.model.username.trim().length > 0) {
            this.model.isValidatingUsername = true;

            this.model.validatedUsername = this.model.username;
            this.registrationService.isUsernameAvailable(this.model.username).subscribe(r => {
                var isAvailable: boolean = r.json() as boolean;
                this.model.isUsernameAvailable = isAvailable;
                this.model.isValidatingUsername = false;
            });
        }
    }
    // validate the email is not used
    validateEmailNotUsed(): void {
        this.model.emailOwner = "";
        this.model.validatedEmail = "";

        if (this.model.email.trim().length > 0) {
            this.model.isValidatingEmail = true;
            this.model.validatedEmail = this.model.email;

            this.registrationService.getEmailOwner(this.model.email).subscribe(r => {
                var emailOwner: any = r.json() as any;
                this.model.emailOwner = emailOwner;
                this.model.isValidatingEmail = false;
            });
        }
    }
}

class RegistrationModel {
    nickname: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    firstName: string;
    lastName: string;
    maritalStatus: MaritalStatus;
    gender: Gender;
    birthDate: Date;
    positionId: number;
    departmentIds: number[];
    employmentDate: Date;
    departmentsOptions: MultiDropdownOption[];
    positionsOptions: DropdownOption[];
    profilePictureUrl: string;

    isValidatingUsername: boolean;
    isUsernameAvailable: boolean;
    validatedUsername: string;

    isValidatingEmail: boolean;
    validatedEmail: string;
    emailOwner: any;

    isSubmitting: boolean;

    constructor() {
        this.gender = Gender.Male;
        this.maritalStatus = MaritalStatus.Unspecified;
        this.profilePictureUrl = 'img/no-avatar.jpg';

        this.isValidatingUsername = false;
        this.isUsernameAvailable = true;

        this.isValidatingEmail = false;
        this.emailOwner = null;
    }
}

class InitRegistrationModel {
    departments: Department[];
    positions: Position[];
}