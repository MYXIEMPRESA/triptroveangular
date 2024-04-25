import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasenia: string = '';
  errorMessage: string | void | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  async iniciarSesion() {
    try {
      await this.authService.logInWithEmailAndPassword(this.usuario, this.contrasenia);
      // El inicio de sesión fue exitoso, puedes redirigir al usuario o realizar otras acciones.
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'Usuario no encontrado. Por favor, registra una cuenta.';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Contraseña incorrecta. Por favor, inténtalo nuevamente.';
      } else {
        this.errorMessage = 'Ha ocurrido un error durante el inicio de sesión. Por favor, inténtalo nuevamente más tarde.';
      }
    }
  }

  iniciarSesionConGoogle() {
    this.authService.logInWithGoogleProvider();
  }

  regresarInicio() {
    // Redirige al usuario a la página de inicio
    this.router.navigate(['/']);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.toggleStickyHeader(window.scrollY > 0);
  }

  private toggleStickyHeader(isSticky: boolean) {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("sticky", isSticky);
    }
  }
}