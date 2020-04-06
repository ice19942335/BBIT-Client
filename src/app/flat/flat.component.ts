import {Component, OnInit} from '@angular/core';
import {Flat, House, User} from '../_models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService, FlatService, HouseService} from '../_services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {CreateFlatRequest} from '../_models/Request/Flat/createFlatRequest';

@Component({templateUrl: 'flat.component.html'})
export class FlatComponent implements OnInit {
  currentUser: User;
  flats: Flat[];
  houses: House[];
  flat: Flat;
  apiResponseStatus: boolean;
  editFlatForm: FormGroup;
  createFlatForm: FormGroup;
  loading: boolean;
  updating: boolean;
  error: '';

  constructor(private flatService: FlatService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService,
              private houseService: HouseService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loading = true;
    this.loadFlats();
    this.editFlatForm = this.formBuilder.group({
      id: [''],
      flatNumber: [''],
      level: [''],
      amountOfRooms: [''],
      totalArea: [''],
      houseRoom: ['']
    });

    this.createFlatForm = this.formBuilder.group({
      id: [''],
      houseId: [''],
      flatNumber: [''],
      level: [''],
      amountOfRooms: [''],
      amountOfTenants: [''],
      totalArea: [''],
      houseRoom: ['']
    });

    this.loadHouses();
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
    this.apiResponseStatus = undefined;
  }

  openModalFlatEdit(targetModal, flat) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editFlatForm.patchValue({
      id: flat.id,
      flatNumber: flat.flatNumber,
      level: flat.level,
      amountOfRooms: flat.amountOfRooms,
      totalArea: flat.totalArea,
      houseRoom: flat.houseRoom
    });
  }

  onSubmitFlatEdit() {
    this.modalService.dismissAll();
    const flatFromForm = this.editFlatForm.getRawValue() as Flat;
    const flat = this.flats.find(x => x.id === flatFromForm.id);

    this.flatService.updateFlat(flatFromForm).pipe(first()).subscribe(data => {
        this.updating = false;
        if (data.status === true) {
          this.updateLocalHouses(flat, flatFromForm);
        }
      },
      error => {
        this.error = error;
        setTimeout(() => { this.error = undefined; }, 5000);
        this.updating = false;
      });

    this.apiResponseStatus = undefined;
  }

  loadFlats() {
    this.flatService.getAllFlats().pipe(first()).subscribe(
      data => {
        this.loading = false;
        this.apiResponseStatus = data.status;
        if (this.apiResponseStatus) {
          this.flats = data.flats;
          this.apiResponseStatus = false;
        }
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

  updateLocalHouses(flatToReplace: Flat, newFlat: Flat) {
    const index = this.flats.indexOf(flatToReplace);
    if (index === -1) { return; }
    this.flats[index].flatNumber = newFlat.flatNumber;
    this.flats[index].level = newFlat.level;
    this.flats[index].amountOfRooms = newFlat.amountOfRooms;
    this.flats[index].totalArea = newFlat.totalArea;
    this.flats[index].houseRoom = newFlat.houseRoom;
  }

  deleteFlat(id: string){
    this.flatService.deleteFlat(id).pipe(first()).subscribe(
      data => {
        this.removeFromLocalFlats(id);
      },
      error => {
        this.error = error;
        setTimeout(() => { this.error = undefined; }, 5000);
      });
  }

  removeFromLocalFlats(id: string) {
    const flat = this.flats.find(x => x.id === id);
    this.flats.splice(this.flats.indexOf(flat), 1);
  }

  openModalCreateFlat(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  onSubmitCreateFlat() {
    this.modalService.dismissAll();
    const flatFromForm = this.createFlatForm.getRawValue() as CreateFlatRequest;

    this.flatService.createFlat(flatFromForm).pipe(first()).subscribe(
      data => {
        this.createHouseFormClearValues();
        this.addFlatToLocalList(data as Flat);
      },
      error => {
        this.error = error;
        setTimeout(() => { this.error = undefined; }, 5000);
      });
  }

  addFlatToLocalList(flat: Flat) {
    this.flats.push(flat);
  }

  createHouseFormClearValues() {
    this.createFlatForm.patchValue({
      id: null,
      houseId: null,
      flatNumber: null,
      level: null,
      amountOfRooms: null,
      amountOfTenants: null,
      totalArea: null,
      houseRoom: null
    });
  }
}
