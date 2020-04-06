import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { HouseComponent } from './house';
import { AuthGuard } from './_helpers';
import {HouseDetailsComponent} from './houseDetails';
import {FlatComponent} from './flat';
import {FlatDetailsComponent} from './flatDetails';
import {TenantComponent} from './tenant';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'house', component: HouseComponent },
    { path: 'houseDetails/:id', component: HouseDetailsComponent },
    { path: 'flat', component: FlatComponent },
    { path: 'flatDetails/:id', component: FlatDetailsComponent },
    { path: 'tenant', component: TenantComponent },
    { path: 'login', component: LoginComponent },

    // Example { path: 'flatsInHouse/:id', component: HouseFlatsComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
