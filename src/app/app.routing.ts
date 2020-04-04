import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { HouseComponent } from './house';
import { AuthGuard } from './_helpers';
import {HouseFlatsComponent} from './houseFlats/houseFlats.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'house', component: HouseComponent },
    { path: 'flatsInHouse/:id', component: HouseFlatsComponent },
    { path: 'login', component: LoginComponent },

    // Example { path: 'flatsInHouse/:id', component: HouseFlatsComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
