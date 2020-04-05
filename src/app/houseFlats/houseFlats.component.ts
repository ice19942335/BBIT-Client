import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {House, User} from '../_models';
import {AuthenticationService, FlatService, HouseService} from '../_services';
import {first} from 'rxjs/operators';
import {Flat} from '../_models/flat';

@Component({templateUrl: 'houseFlats.component.html'})
export class HouseFlatsComponent implements OnInit {
  currentUser: User;
  houseId: string;
  house: House;
  flats: Flat[];
  houseByIdResponseStatus: boolean;
  flatsResponseStatus: boolean;
  houseByIdLoading = true;
  houseByIdError: '';
  houseFlatsLoading = true;
  houseFlatsError: '';
  flatDeletionError: string;

  constructor(private actRoute: ActivatedRoute,
              private houseService: HouseService,
              private authenticationService: AuthenticationService,
              private flatService: FlatService
  )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
        }
      },
      error => {
        this.houseFlatsError = error;
        this.houseFlatsLoading = false;
      });
  }

  deleteFlat(id: string){
    this.flatService.deleteFlat(id).pipe(first()).subscribe(
      data => {
        this.removeFromLocalFlats(id);
      },
      error => {
        this.flatDeletionError = error;
        setTimeout(() => { this.flatDeletionError = undefined; }, 5000);
      });
  }
  removeFromLocalFlats(id: string) {
    const flat = this.flats.find(x => x.id === id);
    this.flats.splice(this.flats.indexOf(flat), 1);
  }
}
