import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';

import {environment} from '../../environments/environment';
import {AllHousesResponse, House, User} from '../_models';
import {HouseByIdResponse} from '../_models/Response/houseByIdResponse';
import {Observable, of} from 'rxjs';
import {UpdateHouseResponse} from '../_models';
import {AuthenticationService} from './authentication.service';

@Injectable({providedIn: 'root'})
export class HouseService {
  constructor(private http: HttpClient) { }

  getAllHouses() {
    return this.http.get<AllHousesResponse>(`${environment.apiUrl}houses`);
  }

  getHouseById(id: string) {
    return this.http.get<HouseByIdResponse>(`${environment.apiUrl}houses/${id}`);
  }

  updateHouse(house: House) {
    return this.http.put<UpdateHouseResponse>(`${environment.apiUrl}houses`, house);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
