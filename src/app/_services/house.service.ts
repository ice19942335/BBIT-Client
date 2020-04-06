import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {AllHousesResponse, CreateHouseRequest, CreateHouseResponse, House, HouseFlatsResponse, UpdateHouseRequest} from '../_models';
import {HouseByIdResponse} from '../_models/Response/House/houseByIdResponse';
import {UpdateHouseResponse} from '../_models';

@Injectable({providedIn: 'root'})
export class HouseService {
  constructor(private http: HttpClient) { }

  createHouse(house: CreateHouseRequest) {
    return this.http.post<CreateHouseResponse>(`${environment.apiUrl}houses`, house);
  }

  getAllHouses() {
    return this.http.get<AllHousesResponse>(`${environment.apiUrl}houses`);
  }

  getHouseById(id: string) {
    return this.http.get<HouseByIdResponse>(`${environment.apiUrl}houses/${id}`);
  }

  getHouseFlats(id: string) {
    return this.http.get<HouseFlatsResponse>(`${environment.apiUrl}houseFlats/${id}`);
  }

  updateHouse(house: UpdateHouseRequest) {
    return this.http.put<UpdateHouseResponse>(`${environment.apiUrl}houses`, house);
  }

  deleteHouse(id: string) {
    return this.http.delete(`${environment.apiUrl}houses/${id}`);
  }
}
