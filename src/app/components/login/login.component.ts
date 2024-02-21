import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | void | undefined;

  constructor(private authService: AuthService) {

  }
  logIn(email: string, password: string) {
   this.authService.logInWithEmailAndPassword(email, password).then((message) => {
    this.errorMessage = message;})
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }
}
