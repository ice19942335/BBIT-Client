import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { House } from '@app/_models';
import { HouseService } from '@app/_services';

@Component({ templateUrl: 'houseDetails.component.html' })
export class HouseDetailsComponent {
    loading = false;
    error = '';
    id: string;
    house: House;
   
    constructor(private houseService: HouseService, private route: ActivatedRoute) { 
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        this.loading = true;
        this.houseService.getHouseById(this.id).pipe(first()).subscribe(
            data => {
                this.loading = false;
                this.house = data.house;
                //console.log(this.house);
            },
            error => {
                this.error = error;
                this.loading = false;
            }
        );
    }
}