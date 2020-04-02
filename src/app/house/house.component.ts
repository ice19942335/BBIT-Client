import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {House} from '../_models';
import {HouseService, ModalService} from '../_services';

@Component({templateUrl: 'house.component.html'})
export class HouseComponent implements OnInit {
  loading = false;
  error = '';
  houses: House[];
  houseId: string;

  constructor(private houseService: HouseService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.loading = true;
    this.houseService.getAll().pipe(first()).subscribe(
      data => {
        this.loading = false;
        this.houses = data.houses;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  openModal(id: string) {
    this.houseId = id;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
