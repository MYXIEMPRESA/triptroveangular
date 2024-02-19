import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component'; 
import { AuthGuard } from './shared/guards/auth.guard';
import { PlaceMapComponent } from './components/place-map/place-map.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { NewPlaceComponent } from './components/new-place/new-place.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'place-map', component: PlaceMapComponent },
  { path: 'place-list', component: PlaceListComponent },
  { path: 'new-place', component: NewPlaceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
