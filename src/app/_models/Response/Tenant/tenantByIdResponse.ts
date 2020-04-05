import {Flat} from '../../flat';

export class TenantByIdResponse {
  id: string;
  name: string;
  surname: string;
  personalCode: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  flat: Flat[];
}
