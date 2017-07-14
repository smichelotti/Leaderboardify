import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'miles-to-meters',
    templateUrl: 'miles-to-meters.component.html'
})
export class MilesToMetersComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    milesToMeters(milesString: string) {
        let miles = _.toNumber(milesString);
        return _.isFinite(miles) ? Math.round(miles * 1609.34) : '0';
    }
}

