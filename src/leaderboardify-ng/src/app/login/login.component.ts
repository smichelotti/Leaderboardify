import { Component, OnInit } from '@angular/core';
import { IdentityInfo } from '../shared/shared';
import { IdentityInfoService } from 'app/services/services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public identityInfo: IdentityInfo;

  constructor(identityService: IdentityInfoService) {
    this.identityInfo = identityService.info;
  }

  ngOnInit() {
  }

}
