import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {AllFlatsResponse} from '../_models/Response/Flat/allFlatsResponse';
import {Flat, FlatTenantsResponse} from '../_models';
import {FlatByIdResponse} from '../_models/Response/Flat/flatByIdResponse';
import {UpdateFlatResponse} from '../_models/Response/Flat/updateFlatResponse';


@Injectable({providedIn: 'root'})
export class FlatService {
  constructor(private http: HttpClient) { }

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
}
