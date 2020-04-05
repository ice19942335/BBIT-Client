import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AllTenantsResponse, Tenant, TenantByIdResponse, UpdateTenantResponse} from '../_models';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TenantService {
  constructor(private http: HttpClient) { }

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
