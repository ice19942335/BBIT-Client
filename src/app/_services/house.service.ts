import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {AllHousesResponse, House, HouseFlatsResponse} from '../_models';
import {HouseByIdResponse} from '../_models/Response/houseByIdResponse';
import {UpdateHouseResponse} from '../_models';

@Injectable({providedIn: 'root'})
export class HouseService {
  constructor(private http: HttpClient) { }

  getAllHouses() {
    return this.http.get<AllHousesResponse>(`${environment.apiUrl}houses`);
  }

  getHouseById(id: string) {
    return this.http.get<HouseByIdResponse>(`${environment.apiUrl}houses/${id}`);
  }

  getHouseFlats(id: string) {
    return this.http.get<HouseFlatsResponse>(`${environment.apiUrl}flatsInHouses/${id}`);
  }

  updateHouse(house: House) {
    return this.http.put<UpdateHouseResponse>(`${environment.apiUrl}houses`, house);
  }
}
