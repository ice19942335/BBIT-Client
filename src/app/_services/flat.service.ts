import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {AllFlatsResponse} from '../_models/Response/Flat/allFlatsResponse';
import {Flat} from '../_models';



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
