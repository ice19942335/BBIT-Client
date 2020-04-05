import {Tenant} from '../../tenant';

export class AllTenantsResponse {
  status: boolean;
  tenants: Tenant[];
}
