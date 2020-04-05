import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { HouseComponent } from './house';
import { AuthGuard } from './_helpers';
import {HouseFlatsComponent} from './houseFlats';
import {FlatComponent} from './flat';
import {FlatTenantsComponent} from './flatTenants';
import {TenantComponent} from './tenant';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'house', component: HouseComponent },
    { path: 'houseFlats/:id', component: HouseFlatsComponent },
    { path: 'flat', component: FlatComponent },
    { path: 'flatTenants/:id', component: FlatTenantsComponent },
    { path: 'tenant', component: TenantComponent },
    { path: 'login', component: LoginComponent },

    // Example { path: 'flatsInHouse/:id', component: HouseFlatsComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
