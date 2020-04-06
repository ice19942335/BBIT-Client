import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {appRoutingModule} from './app.routing';
import {JwtInterceptor, ErrorInterceptor} from './_helpers';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {HouseComponent} from './house';
import {HouseDetailsComponent} from './houseDetails';
import {FlatComponent} from './flat';
import {FlatDetailsComponent} from './flatDetails';
import {TenantComponent} from './tenant';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HouseComponent,
    HouseDetailsComponent,
    FlatComponent,
    FlatDetailsComponent,
    TenantComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
