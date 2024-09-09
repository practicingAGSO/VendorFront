import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VendorPageComponent } from './pages/vendor-page/vendor-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'vendors', component:VendorPageComponent, canActivate: [authGuard]},
    {
        path: '**',
        redirectTo: '',
    }
];
