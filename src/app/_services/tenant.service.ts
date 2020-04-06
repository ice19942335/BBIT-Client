import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AllTenantsResponse, CreateTenantRequest, Flat, Tenant, TenantByIdResponse, UpdateTenantResponse} from '../_models';
import {environment} from '../../environments/environment';
import {CreateFlatRequest} from '../_models/Request/Flat/createFlatRequest';
import {first} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TenantService {
  constructor(private http: HttpClient) { }

  createTenant(tenant: CreateTenantRequest) {
    return this.http.post<Tenant>(`${environment.apiUrl}tenants`, tenant);
  }

  getAllTenants() {
    return this.http.get<AllTenantsResponse>(`${environment.apiUrl}tenants`);
  }

  getTenantById(id: string) {
    return this.http.get<TenantByIdResponse>(`${environment.apiUrl}tenants/${id}`);
  }

  updateTenant(tenant: Tenant) {
    return this.http.put<UpdateTenantResponse>(`${environment.apiUrl}tenants`, tenant);
  }

  deleteTenant(id: string) {
    return this.http.delete(`${environment.apiUrl}tenants/${id}`);
  }
}
