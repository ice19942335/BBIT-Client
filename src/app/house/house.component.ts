import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {House} from '../_models';
import {HouseService, ModalService} from '../_services';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: 'house.component.html'})
export class HouseComponent implements OnInit {
  houses: House[];
  title = 'modal2';
  editProfileForm: FormGroup;

  userList = [
    {
      id: "1",
      firstname: "Aiman",
      lastname: "Rahmat",
      username: "aimanrahmat",
      email: "aimanrahmat@gmail.com"
    },
    {
      id: "2",
      firstname: "Christiano",
      lastname: "Ronaldo",
      username: "ronaldo7",
      email: "ronaldo7@gmail.com"
    },
    {
      id: "3",
      firstname: "Wayne",
      lastname: "Rooney",
      username: "rooney8",
      email: "rooney8@gmail.com"
    }];

  constructor(private houseService: HouseService, private fb: FormBuilder, private modalService: NgbModal) {
  }

  ngOnInit() {
    // this.loading = true;
    // this.houseService.getAll().pipe(first()).subscribe(
    //   data => {
    //     this.loading = false;
    //     this.houses = data.houses;
    //   },
    //   error => {
    //     this.error = error;
    //     this.loading = false;
    //   }
    // );

    this.editProfileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: ['']
    });
  }

  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editProfileForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email
    });
  }
  onSubmit() {
    this.modalService.dismissAll();
    console.log("res:", this.editProfileForm.getRawValue());
  }
}
