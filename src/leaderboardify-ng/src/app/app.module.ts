import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Third Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusyModule } from 'angular2-busy';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HomeComponent } from './home/home.component';
import { HomeComponent } from './components';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { AthleteComponent } from './athlete/athlete.component';
import { PerformanceTargetsModal } from './performance-targets-modal/performance-targets-modal.component';
import { EntryEditorModal } from './entry-editor-modal/entry-editor-modal.component';
import { ConfirmModalComponent, MilesToMetersComponent } from './shared-components/shared-components';

import { IdentityInfoService, LbApiService } from './services/services';

export function initApp(identityService: IdentityInfoService) {
  return () => identityService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    ConfirmModalComponent,
    HomeComponent,
    NavMenuComponent,
    LoginComponent,
    MilesToMetersComponent,
    AthleteComponent,
    PerformanceTargetsModal,
    EntryEditorModal
  ],
  imports: [
    BusyModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    LbApiService,
    IdentityInfoService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [IdentityInfoService],
      multi: true
    }
    //LbApiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmModalComponent,
    EntryEditorModal,
    MilesToMetersComponent,
    PerformanceTargetsModal
  ]
})
export class AppModule { }
