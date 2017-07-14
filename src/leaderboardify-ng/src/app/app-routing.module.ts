import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthleteComponent, HomeComponent } from 'app/components';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'athlete/:userId', component: AthleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
