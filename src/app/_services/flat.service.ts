import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {AllFlatsResponse} from '../_models';
import {Flat, FlatTenantsResponse} from '../_models';
import {FlatByIdResponse} from '../_models';
import {UpdateFlatResponse} from '../_models';
import {CreateFlatRequest} from '../_models/Request/Flat/createFlatRequest';


@Injectable({providedIn: 'root'})
export class FlatService {
  constructor(private http: HttpClient) { }

  createFlat(flat: CreateFlatRequest) {
    return this.http.post<Flat>(`${environment.apiUrl}flats`, flat);
  }

  getAllFlats() {
    return this.http.get<AllFlatsResponse>(`${environment.apiUrl}flats`);
  }

  getFlatById(id: string) {
    return this.http.get<FlatByIdResponse>(`${environment.apiUrl}flats/${id}`);
  }

  getFlatTenants(id: string) {
    return this.http.get<FlatTenantsResponse>(`${environment.apiUrl}flatTenants/${id}`);
  }

  updateFlat(flat: Flat) {
    return this.http.put<UpdateFlatResponse>(`${environment.apiUrl}flats`, flat);
  }

  deleteFlat(id: string) {
    return this.http.delete(`${environment.apiUrl}flats/${id}`);
  }
}
