import {ActivatedRoute} from '@angular/router';
import {AuthenticationService, FlatService, TenantService} from '../_services';
import {Component, OnInit} from '@angular/core';
import {Flat, Tenant, User} from '../_models';
import {first} from 'rxjs/operators';

@Component({templateUrl: 'flatDetails.component.html'})
export class FlatDetailsComponent implements OnInit {
  currentUser: User;
  flatId: string;
  flat: Flat;
  tenants: Tenant[];
  flatByIdResponseStatus: boolean;
  tenantsResponseStatus: boolean;
  flatByIdLoading = true;
  flatByIdError: '';
  flatTenantsLoading = true;
  flatTenantsError: '';
  tenantDeletionError: string;


  constructor(private actRoute: ActivatedRoute,
              private flatService: FlatService,
              private authenticationService: AuthenticationService,
              private tenantService: TenantService
  )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.flatId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.loadFlatById(this.flatId);
    this.loadFlatTenants(this.flatId);
  }

  loadFlatById(id: string) {
    this.flatService.getFlatById(id).pipe(first()).subscribe(
      data => {
        this.flatByIdLoading = false;
        this.flatByIdResponseStatus = data.status;
        if (this.flatByIdResponseStatus) {
          this.flat = data.flat;
          this.flatByIdResponseStatus = false;
        }
      },
      error => {
        this.flatByIdError = error;
        setTimeout(() => { this.flatByIdError = undefined; }, 5000);
        this.flatByIdLoading = false;
      });
  }

  loadFlatTenants(houseId: string) {
    this.flatService.getFlatTenants(houseId).pipe(first()).subscribe(
      data => {
        this.flatTenantsLoading = false;
        this.tenantsResponseStatus = data.status;
        if (this.tenantsResponseStatus) {
          this.tenants = data.tenants;
          this.tenantsResponseStatus = false;
        }
      },
      error => {
        this.flatTenantsError = error;
        setTimeout(() => { this.flatTenantsError = undefined; }, 5000);
        this.flatTenantsLoading = false;
      });
  }

  deleteTenant(id: string){
    this.tenantService.deleteTenant(id).pipe(first()).subscribe(
      data => {
        this.removeFromLocalTenants(id);
      },
      error => {
        this.tenantDeletionError = error;
        setTimeout(() => { this.tenantDeletionError = undefined; }, 5000);
      });
  }

  removeFromLocalTenants(id: string) {
    const tenant = this.tenants.find(x => x.id === id);
    this.tenants.splice(this.tenants.indexOf(tenant), 1);
  }
}
