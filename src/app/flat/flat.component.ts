import {Component, OnInit} from '@angular/core';
import {House, User} from '../_models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService, HouseService} from '../_services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';

@Component({templateUrl: 'flat.component.html'})
export class FlatComponent implements OnInit {
  currentUser: User;
  flats: House[];
  house: House;
  apiResponseStatus: boolean;
  editFlatForm: FormGroup;
  loading: boolean;
  error: '';

  constructor(private houseService: HouseService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loading = true;
    this.loadHouses();
    this.editFlatForm = this.formBuilder.group({
      id: [''],
      houseNumber: [''],
      streetName: [''],
      city: [''],
      country: [''],
      postCode: ['']
    });
  }

  openModal(targetModal, flat) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    // id: string;
    // flatNumber: string;
    // floor: number;
    // amountOfRooms: number;
    // amountOfTenants: number;
    // totalArea: number;
    // houseRoom: number;
    // house: House;

    this.editFlatForm.patchValue({
      id: flat.id,
      flatNumber: flat.flatNumber,
      floor: flat.level,
      amountOfRooms: flat.amountOfRooms,
      amountOfTenants: flat.amountOfTenants,
      totalArea: flat.totalArea,
      houseRoom: flat.houseRoom,
      house: flat.house
    });
  }

  onSubmit() {
    this.modalService.dismissAll();
    const houseFromForm = this.editHouseForm.getRawValue();
    const house = this.houses.find(x => x.id === houseFromForm.id);

    this.houseService.updateHouse(houseFromForm).pipe(first()).subscribe(data => {
        this.loading = false;
        if (data.status === true) {
          this.updateLocalHouses(house, houseFromForm);
        }
      },
      error => {
        this.error = error;
        this.loading = false;
      });

    this.apiResponseStatus = undefined;
  }

  loadHouses() {
    this.houseService.getAllHouses().pipe(first()).subscribe(
      data => {
        this.loading = false;
        this.apiResponseStatus = data.status;
        if (this.apiResponseStatus) {
          this.houses = data.houses;
          this.apiResponseStatus = false;
        }
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

  updateLocalHouses(houseToReplace: House, newHouse: House) {
    const index = this.houses.indexOf(houseToReplace);
    if (index === -1) {
      return;
    }

    this.houses[index] = newHouse;
  }

}
