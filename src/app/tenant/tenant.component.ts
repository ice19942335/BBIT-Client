import {Component, OnInit} from '@angular/core';
import {CreateTenantRequest, Flat, Tenant, User} from '../_models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService, FlatService, TenantService} from '../_services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {CreateFlatRequest} from '../_models/Request/Flat/createFlatRequest';

@Component({templateUrl: 'tenant.component.html'})
export class TenantComponent implements OnInit {
  currentUser: User;
  tenants: Tenant[];
  tenant: Tenant;
  flats: Flat[];
  apiResponseStatus: boolean;
  editTenantForm: FormGroup;
  createTenantForm: FormGroup;
  loading: boolean;
  updating: boolean;
  error: '';

  constructor(private tenantService: TenantService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService,
              private flatService: FlatService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loading = true;

    this.editTenantForm = this.formBuilder.group({
      id: [''],
      name: [''],
      surname: [''],
      personalCode: [''],
      dateOfBirth: [''],
      phoneNumber: [''],
      email: ['']
    });

    this.createTenantForm = this.formBuilder.group({
      flatId: [''],
      name: [''],
      surname: [''],
      personalCode: [''],
      dateOfBirth: [''],
      phoneNumber: [''],
      email: ['']
    });

    this.loadTenants();
    this.loadFlats();
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

  onSubmitEditTenant() {
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
        setTimeout(() => {
          this.error = undefined;
        }, 5000);
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

  loadFlats() {
    this.flatService.getAllFlats().pipe(first()).subscribe(
      data => {
        this.loading = false;
        this.apiResponseStatus = data.status;
        if (this.apiResponseStatus) {
          this.flats = data.flats;
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
    if (index === -1) {
      return;
    }
    this.tenants[index] = newTenant;
  }

  deleteTenant(id: string) {
    this.tenantService.deleteTenant(id).pipe(first()).subscribe(
      data => {
        this.removeFromLocalTenants(id);
      },
      error => {
        this.error = error;
        setTimeout(() => {
          this.error = undefined;
        }, 5000);
      });
  }

  removeFromLocalTenants(id: string) {
    const tenant = this.tenants.find(x => x.id === id);
    this.tenants.splice(this.tenants.indexOf(tenant), 1);
  }

  openModalCreateTenant(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  onSubmitCreateTenant() {
    this.modalService.dismissAll();
    const newTenant = this.createTenantForm.getRawValue() as CreateTenantRequest;

    //
    console.log(newTenant);
    //

    this.tenantService.createTenant(newTenant).pipe(first()).subscribe(
      data => {
        this.createTenantFormClearValues();
        this.addTenantToLocalList(data as Tenant);
      },
      error => {
        this.error = error;
        setTimeout(() => {
          this.error = undefined;
        }, 5000);
      });
  }

  addTenantToLocalList(tenant: Tenant) {
    this.tenants.push(tenant);
  }

  createTenantFormClearValues() {
    this.createTenantForm.patchValue({
      flatId: null,
      name: null,
      surname: null,
      personalCode: null,
      dateOfBirth: null,
      phoneNumber: null,
      email: null,
    });
  }
}
