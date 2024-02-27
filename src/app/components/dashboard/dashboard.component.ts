import { Component, AfterViewChecked } from '@angular/core';
import { CarouselComponent, CarouselConfig } from 'ngx-bootstrap/carousel';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [{ provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }]
})
export class DashboardComponent {

  constructor(private authService: AuthService,) {

  }



  logOut() {
    this.authService.logOut();
  }
}
