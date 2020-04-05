import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {House, User} from '../_models';
import {AuthenticationService, HouseService} from '../_services';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: 'house.component.html'})
export class HouseComponent implements OnInit {
  currentUser: User;
  houses: House[];
  house: House;
  apiResponseStatus: boolean;
  editHouseForm: FormGroup;
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
    this.editHouseForm = this.formBuilder.group({
      id: [''],
      houseNumber: [''],
      streetName: [''],
      city: [''],
      country: [''],
      postCode: ['']
    });
  }

  openModal(targetModal, house) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editHouseForm.patchValue({
      id: house.id,
      houseNumber: house.houseNumber,
      streetName: house.streetName,
      city: house.city,
      country: house.country,
      postCode: house.postCode
    });
  }

  onSubmit() {
    this.modalService.dismissAll();
    const houseFromForm = this.editHouseForm.getRawValue() as House;
    const house = this.houses.find(x => x.id === houseFromForm.id);

    this.houseService.updateHouse(houseFromForm).pipe(first()).subscribe(
      data => {
        this.loading = false;
        if (data.status === true) {
          this.updateLocalHouses(house, houseFromForm);
        }
      },
      error => {
        this.error = error;
        setTimeout(() => { this.error = undefined; }, 5000);
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
