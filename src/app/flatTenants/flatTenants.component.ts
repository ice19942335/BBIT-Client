import {ActivatedRoute} from '@angular/router';
import {FlatService} from '../_services';
import {Component, OnInit} from '@angular/core';
import {Flat, Tenant} from '../_models';
import {first} from 'rxjs/operators';

@Component({templateUrl: 'flatTenants.component.html'})
export class FlatTenantsComponent implements OnInit {
  flatId: string;
  flat: Flat;
  tenants: Tenant[];
  flatByIdResponseStatus: boolean;
  tenantsResponseStatus: boolean;
  flatByIdLoading = true;
  flatByIdError: '';
  flatTenantsLoading = true;
  flatTenantsError: '';

  constructor(private actRoute: ActivatedRoute,
              private flatService: FlatService) {
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
        this.flatTenantsLoading = false;
      });
  }
}
