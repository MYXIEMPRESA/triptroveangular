import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        let errorMessage = 'Hubo un error al iniciar sesión con Google.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.';
        }
        return errorMessage;
      });
  }

  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error) => {
        let errorMessage = 'Hubo un error al iniciar sesión con Google.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.';
        }
        return errorMessage;
      });
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        let errorMessage = 'Hubo un error al iniciar sesión con Google.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.';
        }
        return errorMessage;
      });
  }

  signUpWithGoogle() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        let errorMessage = 'Hubo un error al iniciar sesión con Google.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.';
        }
        return errorMessage;
      });
  }

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']));
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

}