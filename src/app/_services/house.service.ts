import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, House, AllHousesResponse} from '@app/_models';
import { HouseByIdResponse } from '@app/_models/Response/houseByIdResponse';

@Injectable({ providedIn: 'root' })
export class HouseService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<AllHousesResponse>(`${environment.apiUrl}/api/v1/houses`);
    }

    getHouseById(id: string) {
        return this.http.get<HouseByIdResponse>(`${environment.apiUrl}/api/v1/houses/${id}`);
    }
}