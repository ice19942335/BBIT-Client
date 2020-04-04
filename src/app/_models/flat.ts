import {House} from './house';

export class Flat {
  id: string;
  flatNumber: string;
  floor: number;
  amountOfRooms: number;
  amountOfTenants: number;
  totalArea: number;
  houseRoom: number;
  house: House;
}
