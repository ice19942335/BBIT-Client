import {Component, OnInit} from '@angular/core';
import {Flat, User} from '../_models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService, FlatService} from '../_services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';

@Component({templateUrl: 'flat.component.html'})
export class FlatComponent implements OnInit {
  currentUser: User;
  flats: Flat[];
  house: Flat;
  apiResponseStatus: boolean;
  editFlatForm: FormGroup;
  loading: boolean;
  updating: boolean;
  error: '';

  constructor(private flatService: FlatService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService) {
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
      amountOfTenants: [''],
      totalArea: [''],
      houseRoom: ['']
    });
  }

  openModal(targetModal, flat) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editFlatForm.patchValue({
      id: flat.id,
      flatNumber: flat.flatNumber,
      level: flat.level,
      amountOfRooms: flat.amountOfRooms,
      amountOfTenants: flat.amountOfTenants,
      totalArea: flat.totalArea,
      houseRoom: flat.houseRoom
    });
  }

  onSubmit() {
    this.modalService.dismissAll();
    const formData = this.editFlatForm.getRawValue();
    //
    const updatedFlat = formData as Flat;
    console.log(updatedFlat);
    //
    const flat = this.flats.find(x => x.id === formData.id);

    this.flatService.updateFlat(formData).pipe(first()).subscribe(data => {
        this.updating = false;
        if (data.status === true) {
          this.updateLocalHouses(flat, formData);
        }
      },
      error => {
        this.error = error;
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
    this.flats[index] = newFlat;
  }
}
