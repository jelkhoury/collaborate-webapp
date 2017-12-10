import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';

import { SigninCallbackComponent } from './components/login/signin-callback.component';
import { HomeComponent } from './components/home/home.component';
import { ManageUsersComponent } from './components/management/users.component';
import { RegistrationComponent } from './components/management/registration.component';
import { ManageDepartmentsComponent } from './components/management/departments.component';
import { SearchResultComponent } from './components/search/search-result.component';
import { MyProfileComponent } from './components/profile/my-profile.component';
import { AccountComponent } from './components/account/account.component';
import { SilentRenewCallbackComponent } from './components/silent-renew-callback/silent-renew-callback.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: 'silent-renew-callback', component: SilentRenewCallbackComponent },
  { path: 'search', component: SearchResultComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  {
    path: 'management',
    children: [
      { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] },
      { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
      { path: 'departments', component: ManageDepartmentsComponent, canActivate: [AuthGuard] }
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthenticationService, AuthGuard]
})

export class AppRoutingModule { }
