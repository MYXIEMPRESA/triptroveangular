import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DownloadComponent } from './components/download/download.component';
import { MapsModule } from './components/maps/maps.module';
import { FormsModule } from '@angular/forms';
import { UploadLocationsModule } from './components/UploadLocations/upload-locations.module';
import { AdminPlaceComponent } from './components/admin-place/admin-place.component';
import { PlaceListUserComponent } from './components/place-list-user/place-list-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentsComponent } from './components/comments/comments.component';
import { SearchBardComponent } from './components/search-bard/search-bard.component';
import { AsociateComponent } from './components/asociate/asociate.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    DownloadComponent,
    AdminPlaceComponent,
    PlaceListUserComponent,
    CommentsComponent,
    SearchBardComponent,
    AsociateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MapsModule,
    UploadLocationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

