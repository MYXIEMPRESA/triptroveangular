import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | void | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  async signUp() {
    try {
      await this.authService.signUpWithEmailAndPassword(this.email, this.password);
      // El registro fue exitoso, puedes redirigir al usuario o realizar otras acciones.
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Este correo electrónico ya está en uso. Por favor, utiliza otro correo.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = 'La contraseña es débil. Por favor, utiliza una contraseña más segura.';
      } else {
        this.errorMessage = 'Ha ocurrido un error durante el registro. Por favor, inténtalo nuevamente más tarde.';
      }
    }
  }

  registerWithGoogle() {
    this.authService.signUpWithGoogle();
  }

  goBack() {
    // Redirige al usuario a la página anterior
    this.router.navigate(['/']);
  }
}