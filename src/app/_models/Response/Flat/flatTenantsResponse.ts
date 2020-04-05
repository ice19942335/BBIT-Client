import {Tenant} from '../../tenant';

export class FlatTenantsResponse {
  status: boolean;
  tenants: Tenant[];
}
