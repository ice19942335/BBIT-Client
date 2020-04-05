import {Component, OnInit} from '@angular/core';
import {Flat, Tenant, User} from '../_models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService, TenantService} from '../_services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({templateUrl: 'tenant.component.html'})
export class TenantComponent implements OnInit {
  currentUser: User;
  tenants: Tenant[];
  tenant: Tenant;
  apiResponseStatus: boolean;
  editTenantForm: FormGroup;
  loading: boolean;
  updating: boolean;
  error: '';

  constructor(private tenantService: TenantService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loading = true;
    this.loadTenants();
    this.editTenantForm = this.formBuilder.group({
      id: [''],
      name: [''],
      surname: [''],
      personalCode: [''],
      dateOfBirth: [''],
      phoneNumber: [''],
      email: ['']
    });
  }

  openModal(targetModal, tenant) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editTenantForm.patchValue({
      id: tenant.id,
      name: tenant.name,
      surname: tenant.surname,
      personalCode: tenant.personalCode,
      dateOfBirth: tenant.dateOfBirth,
      phoneNumber: tenant.phoneNumber,
      email: tenant.email
    });
  }

  onSubmit() {
    this.modalService.dismissAll();
    const tenantFromForm = this.editTenantForm.getRawValue() as Tenant;
    const tenant = this.tenants.find(x => x.id === tenantFromForm.id);

    this.tenantService.updateTenant(tenantFromForm).pipe(first()).subscribe(data => {
        this.updating = false;
        if (data.status === true) {
          this.updateLocalTenant(tenant, tenantFromForm);
        }
      },
      error => {
        this.error = error;
        setTimeout(() => { this.error = undefined; }, 5000);
        this.updating = false;
      });

    this.apiResponseStatus = undefined;
  }

  loadTenants() {
    this.tenantService.getAllTenants().pipe(first()).subscribe(
      data => {
        this.loading = false;
        this.apiResponseStatus = data.status;
        if (this.apiResponseStatus) {
          this.tenants = data.tenants;
          this.apiResponseStatus = false;
        }
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

  updateLocalTenant(tenantToReplace: Tenant, newTenant: Tenant) {
    const index = this.tenants.indexOf(tenantToReplace);
    if (index === -1) { return; }
    this.tenants[index] = newTenant;
  }
}
