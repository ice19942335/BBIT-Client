import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {House} from '../_models';
import {HouseService} from '../_services';
import {first} from 'rxjs/operators';
import {Flat} from '../_models/flat';

@Component({templateUrl: 'houseFlats.component.html'})
export class HouseFlatsComponent implements OnInit{
  houseId: string;
  house: House;
  flats: Flat[];
  houseByIdResponseStatus: boolean;
  flatsResponseStatus: boolean;
  houseByIdLoading = true;
  houseByIdError: '';
  houseFlatsLoading = true;
  houseFlatsError: '';

  constructor(private actRoute: ActivatedRoute,
              private houseService: HouseService) {
    this.houseId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.loadHouseById(this.houseId);
    this.loadHouseFlats(this.houseId);
  }

  loadHouseById(id: string) {
    this.houseService.getHouseById(id).pipe(first()).subscribe(
      data => {
        this.houseByIdLoading = false;
        this.houseByIdResponseStatus = data.status;
        if (this.houseByIdResponseStatus) {
          this.house = data.house;
          this.houseByIdResponseStatus = false;
        }
      },
      error => {
        this.houseByIdError = error;
        this.houseByIdLoading = false;
      });
  }

  loadHouseFlats(houseId: string) {
    this.houseService.getHouseFlats(houseId).pipe(first()).subscribe(
      data => {
        this.houseFlatsLoading = false;
        this.flatsResponseStatus = data.status;
        if (this.flatsResponseStatus) {
          this.flats = data.flats;
          this.flatsResponseStatus = false;
          console.log(this.flats);
        }
      },
      error => {
        this.houseFlatsError = error;
        this.houseFlatsLoading = false;
      });
  }
}
