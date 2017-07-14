import { Component, OnInit } from '@angular/core';
import { IdentityInfoService } from "app/services/services";
import { IdentityInfo } from "app/shared/shared";

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  identityInfo: IdentityInfo;

  constructor(identityService: IdentityInfoService) {
    this.identityInfo = identityService.info;
  }

  ngOnInit() {
  }

}
