import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AthletePerformance } from '../shared/shared';
import * as _ from 'lodash';

@Component({
  selector: 'app-performance-targets-modal',
  templateUrl: './performance-targets-modal.component.html',
  styleUrls: ['./performance-targets-modal.component.css']
})
export class PerformanceTargetsModal implements OnInit {
  public editableItem: AthletePerformance;
  public perfTarget: AthletePerformance;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.editableItem = _.cloneDeep(this.perfTarget);
  }

  save() {
    //TODO: need to put validation in
    this.activeModal.close(this.editableItem);
  }

}
