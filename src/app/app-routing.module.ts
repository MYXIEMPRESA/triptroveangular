import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component'; 
import { AuthGuard } from './shared/guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { MapScreenComponent } from './components/maps/screens/map-screen/map-screen.component';
import { AdminPlaceComponent } from './components/admin-place/admin-place.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AsociateComponent } from './components/asociate/asociate.component';
import { AndroidComponent } from './components/android/android.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signIn', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'about', component: AboutComponent},
  { path: 'association', component: AsociateComponent},
  { path: 'maps', component: MapScreenComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-place', component: AdminPlaceComponent, canActivate: [AuthGuard]},
  { path: 'comments', component: CommentsComponent, canActivate: [AuthGuard]},
  { path: 'android', component: AndroidComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
