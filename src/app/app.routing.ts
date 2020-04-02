import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { HouseComponent } from './house';
import { HouseDetailsComponent } from './houseDetails/houseDetails.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'house', component: HouseComponent },
    { path: 'house/:id', component: HouseDetailsComponent },
    { path: 'login', component: LoginComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
