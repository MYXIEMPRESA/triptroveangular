import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component'; 
import { AuthGuard } from './shared/guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { DownloadComponent } from './components/download/download.component';
import { MapScreenComponent } from './components/maps/screens/map-screen/map-screen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'maps', component: MapScreenComponent },
  { path: 'download', component: DownloadComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'about', component: AboutComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
