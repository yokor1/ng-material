import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<{ui: fromApp.State}>) {
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading = this.store.pipe(
      map(state => state.ui.isLoading)
    )
  }

  onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
