import {Flat} from '../../flat';

export class UpdateTenantResponse {
  id: string;
  name: string;
  surname: string;
  personalCode: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  flat: Flat[];
}
