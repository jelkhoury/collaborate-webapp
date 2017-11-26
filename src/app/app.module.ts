import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './_guards/auth.guard';

// component
import { AppComponent } from './app.component'
import { SigninCallbackComponent } from './components/login/signin-callback.component'
import { HomeComponent } from './components/home/home.component';
import { TopNavMenuComponent } from './components/navmenu/top-navmenu.component';
import { ManageUsersComponent } from './components/management/users.component';
import { ChatGroupsComponent } from './components/chat/chat-groups.component';

import { ManageDepartmentsComponent } from './components/management/departments.component';
import { RegistrationComponent } from './components/management/registration.component';
import { GenderComponent } from './shared/components/gender.component';
import { MaritalStatusComponent } from './shared/components/marital-status.component';
import { DropdownComponent } from './shared/components/dropdown.component';
import { MultiDropdownComponent } from './shared/components/multi-dropdown.component';
import { DatepickerComponent } from './shared/components/datepicker.component';
import { SearchResultComponent } from './components/search/search-result.component';
import { MyProfileComponent } from './components/profile/my-profile.component';
import { SilentRenewCallbackComponent } from './components/silent-renew-callback/silent-renew-callback.component';

// services
import { RegistrationService } from './services/registration.service';
import { LocalizationService } from './services/localization.service';
import { AuthenticationService } from './services/authentication.service';
import { SystemService } from './services/system.service';
import { ChatService } from './services/chat.service';

import { AppRoutingModule } from './app-routing.module';
import { UsersPipe } from './components/management/users.component';

// 3rd party modules
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
//import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
//import { NgUploaderModule } from 'ngx-uploader';
//import { SimpleNotificationsModule } from 'angular2-notifications';

// bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        //LoginComponent,
        SigninCallbackComponent,
        HomeComponent,
        MyProfileComponent,
        TopNavMenuComponent,
        ManageUsersComponent,
        ManageDepartmentsComponent,
        RegistrationComponent,
        GenderComponent,
        MaritalStatusComponent,
        DropdownComponent,
        MultiDropdownComponent,
        DatepickerComponent,
        SearchResultComponent,
        ChatGroupsComponent,
        UsersPipe,
        SilentRenewCallbackComponent
    ],
    providers: [
        AuthGuard,
        RegistrationService,
        LocalizationService,
        AuthenticationService,
        SystemService,
        ChatService,
        { provide: 'ORIGIN_URL', useValue: location.origin },
        { provide: 'API_URL', useValue: "http://localhost:5559" }
    ],
    imports: [
        HttpModule,
        AppRoutingModule,
        FormsModule,
        MultiselectDropdownModule,
        //Ng2DatetimePickerModule,
        //NgUploaderModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot()
        //SimpleNotificationsModule.forRoot()
    ]
})
export class AppModule {

}
