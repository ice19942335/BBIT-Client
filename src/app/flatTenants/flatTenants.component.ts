import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../_services';
import {Component} from '@angular/core';

@Component({templateUrl: 'flatTenants.component.html'})
export class FlatTenantsComponent {
  flatId: string;

  constructor(private actRoute: ActivatedRoute,
              private houseService: HouseService) {
    this.flatId = this.actRoute.snapshot.params.id;
  }
}
