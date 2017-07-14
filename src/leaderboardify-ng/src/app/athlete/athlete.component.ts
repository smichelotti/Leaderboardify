import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EntryEditorModal, PerformanceTargetsModal } from '../components';
import { ConfirmModalComponent, ConfirmModalProperties } from '../shared-components/shared-components';
import { LbApiService, IdentityInfoService } from '../services/services';
import { AthletePerformance, WorkoutEntry, IdentityInfo } from '../shared/shared';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subscription } from "rxjs/Subscription";

const modalOptions: NgbModalOptions = { size: 'sm' };

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css']
})
export class AthleteComponent implements OnInit {
  public busy: Subscription;
  public busyEntries: Subscription;
  identityInfo: IdentityInfo;
  athletePerf = new AthletePerformance();
  editable = false;
  userId: string;
  workoutEntries: WorkoutEntry[];

  constructor(
    private router: ActivatedRoute,
    private modal: NgbModal,
    private lbApi: LbApiService,
    identityService: IdentityInfoService) { 
      this.identityInfo = identityService.info;
    }

  ngOnInit() {
    this.router.params.subscribe(params => {
      let userIdParam = params['userId'];

      if (this.identityInfo.isAuthenticated) {
        this.userId = (userIdParam === 'me' ? this.identityInfo.userId : userIdParam);
        this.editable = (this.identityInfo.userId === this.userId);
      } else {
        if (userIdParam === 'me') {
          window.location.href = '/account/login';
        } else {
          this.userId = userIdParam;
        }
      }

      this.busyEntries = this.lbApi.getUserEntries(this.userId).subscribe(data => {
        this.workoutEntries = data;
      });

      this.busy = this.refreshAthletePerformance();
    });
  }

  addNewEntry() {
    this.modal.open(EntryEditorModal, modalOptions).result.then(result => {
      this.busy = this.lbApi.addWorkoutEntry(result).subscribe(data => {
        this.workoutEntries.push(data);
        return this.refreshAthletePerformance();
      });
    }, reason => reason);
  }

  editEntry(entry: WorkoutEntry) {
    let modalRef = this.modal.open(EntryEditorModal, modalOptions);
    modalRef.componentInstance.entry = entry;
    modalRef.result.then(result => {
      this.busy = this.lbApi.updateWorkoutEntry(result).subscribe(data => {
        _.assign(entry, data);
        return this.refreshAthletePerformance();
      });
    }, reason => reason);

  }

  deleteEntry(entry: WorkoutEntry) {
    let modalRef = this.modal.open(ConfirmModalComponent);
    modalRef.componentInstance.properties = <ConfirmModalProperties>{ title: 'Delete?', message: 'Are you sure you want to delete this entry?', buttons: ['Yes', 'No'] };
    modalRef.result.then(result => {
      this.busy = this.lbApi.deleteWorkoutEntry(entry.id).subscribe(result => {
        _.remove(this.workoutEntries, entry);
        return this.refreshAthletePerformance();
      });
    }, reason => reason);
  }

  getProgressBarType(type: string) {
    let pct = (this.athletePerf[type + 'Total'] / this.athletePerf[`${type}Target`]) * 100;

    if (pct <= 25) {
      return 'success';
    } else if (pct > 25 && pct <= 50) {
      return 'info';
    } else if (pct > 50 && pct <= 75) {
      return 'warning';
    } else if (pct > 75) {
      return 'danger';
    }
  }

  refreshAthletePerformance() {
    return this.lbApi.getAthletePerformance(this.userId).subscribe(data => {
      if (data) {
        this.athletePerf = data;
      }
    });
  }

  setTargets() {
    let modalRef = this.modal.open(PerformanceTargetsModal, modalOptions);
    modalRef.componentInstance.perfTarget = this.athletePerf;
    modalRef.result.then(performance => {
      this.busy = this.lbApi.saveAthletePerformance(performance, this.identityInfo.userId).subscribe(performance => this.athletePerf = performance);
    }, reason => reason);
  }

  formatDate(entryDate: string) {
    let date = moment(entryDate);
    return `${date.month() + 1}/${date.date()}/${date.year()}`;
  }

  formatNumber(num: number) {
    return num ? num.toLocaleString() : '';
  }

  formatTotal(num: number) {
    let temp = this.formatNumber(num);
    return temp.length === 0 ? '0' : temp;
  }

  formatTarget(num: number) {
    let temp = this.formatNumber(num);
    return temp.length === 0 ? '{No goal set}' : temp;
  }

  percentComplete(total: number, target: number) {
    if (total && target) {
      let pct = total / target;
      return Math.round(pct * 100);
    } else {
      return '';
    }
  }

}
