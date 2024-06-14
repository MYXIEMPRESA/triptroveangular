import { Component, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
search() {
throw new Error('Method not implemented.');
}
searchTerm: any;

  constructor(private authService: AuthService,) {

  }

  logOut() {
    this.authService.logOut();
  }
}
