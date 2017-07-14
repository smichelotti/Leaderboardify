import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WorkoutEntry } from '../shared/shared';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-entry-editor-modal',
  templateUrl: './entry-editor-modal.component.html',
  styleUrls: ['./entry-editor-modal.component.css']
})
export class EntryEditorModal implements OnInit {
  public action = 'Add';
  public editableItem: WorkoutEntry = new WorkoutEntry();
  public entry: WorkoutEntry;// = new WorkoutEntry();
  public workoutDate: NgbDateStruct;

  constructor(public activeModal: NgbActiveModal) {
    //this.workoutDate = new Date();
  }

  ngOnInit() {
    if(this.entry){
      this.action = 'Edit';
      this.editableItem = _.cloneDeep(this.entry);
    }
    this.initDate(this.entry);
  }

  initDate(entry: WorkoutEntry) {
    let entryDate = (entry ? moment(entry.date) : moment());
    this.workoutDate = { month: entryDate.month() + 1, day: entryDate.date(), year: entryDate.year() };
  }

  save() {
    //TODO: check for valiation here
    this.editableItem.date = `${this.workoutDate.year}-${this.workoutDate.month}-${this.workoutDate.day}`;
    this.activeModal.close(this.editableItem);
  }

  milesToMeters(milesString: string) {
    let miles = _.toNumber(milesString);
    return _.isFinite(miles) ? Math.round(miles * 1609.34) : '0';
  }

}
