import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LbApiService } from '../services/services';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public busy: Subscription;
  performances: any[];
  
  constructor(public router: Router, private lbApi: LbApiService) { }

  ngOnInit() {
    this.busy = this.lbApi.getAllPerformance().subscribe(result => {
      this.performances = result;
    });
  }

  gotoPolicyEditor() {
    let link = ['policy-editor'];
    this.router.navigate(link);
  }

}
