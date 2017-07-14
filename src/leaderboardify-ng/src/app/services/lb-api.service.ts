import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { WorkoutEntry, IdentityInfo } from '../shared/shared';
import { IdentityInfoService } from './services'; 

//const baseUrl = 'https://localhost:5001';
const baseUrl = '';

@Injectable()
export class LbApiService {
  public identityInfo: IdentityInfo;

  //constructor(private http: Http, @Inject('IdentityInfo') private identityInfo: any) { }
  constructor(private http: Http) { //, identityService: IdentityInfoService) { 
    //this.identityInfo = identityService.info;
  }

  addWorkoutEntry(entry: WorkoutEntry) {
    return this.http.post(`${baseUrl}/api/workout-entries`, entry).map(response => response.json());
  }

  updateWorkoutEntry(entry: WorkoutEntry) {
    return this.http.put(`${baseUrl}/api/workout-entries/${entry.id}`, entry).map(response => response.json());
  }

  getUserEntries(userId: string) {
    return this.http.get(`${baseUrl}/api/workout-entries/user/${userId}`).map(response => response.json());
  }

  deleteWorkoutEntry(id: number) {
    return this.http.delete(`${baseUrl}/api/workout-entries/${id}`);
  }

  getAllPerformance() {
    return this.http.get(`${baseUrl}/api/performances`).map(response => response.json());
  }

  getAthletePerformance(userId: string) {
    //let userId = this.identityInfo.userId;
    return this.http.get(`${baseUrl}/api/performances/${userId}`).map(response => response.json());
  }

  saveAthletePerformance(performance: any, userId: string) {
    //let userId = this.identityInfo.userId;
    performance.userId = userId;
    return this.http.put(`${baseUrl}/api/performances/${userId}`, performance).map(response => response.json());
  }

}
