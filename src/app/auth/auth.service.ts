import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private token: string;

  constructor(private router: Router, private fbAuth: AngularFireAuth) { }

  initAuthLestner() {
    this.fbAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData): Promise<any> {
    return this.fbAuth.auth
    .createUserWithEmailAndPassword(authData.email, authData.password);
  }

  login(authData: AuthData): Promise<any> {
    return this.fbAuth.auth
    .signInWithEmailAndPassword(authData.email, authData.password);
  }

  logout() {
    this.fbAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
