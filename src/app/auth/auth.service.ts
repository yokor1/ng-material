import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fbAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
  private store: Store<{ui: fromApp.State}>) { }

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
    }, error => this.snackBar.open(error.message, null, {
      duration: 4000
    }));
  }

  registerUser(authData: AuthData): Promise<any> {
    this.store.dispatch({type: 'START_LOADING'});
    return this.fbAuth.auth
    .createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.store.dispatch({type: 'STOP_LOADING'});
      return result;
    })
    .catch(error => {
      this.snackBar.open(error.message, null, {
      duration: 4000
    });
    this.store.dispatch({type: 'STOP_LOADING'});
  });
  }

  login(authData: AuthData): Promise<any> {
    return this.fbAuth.auth
    .signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.store.dispatch({type: 'STOP_LOADING'});
      return result;
    })
    .catch(error => {
      this.snackBar.open(error.message, null, {
      duration: 4000
    });
    this.store.dispatch({type: 'STOP_LOADING'});
  });
  }

  logout() {
    this.fbAuth.auth.signOut()
    .catch(error => this.snackBar.open(error.message));
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
