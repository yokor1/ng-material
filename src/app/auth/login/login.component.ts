import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
    .then(result => {
      this.isLoading = false;
    })
    .catch(
      result => {
        this.isLoading = false;
      }
    );
  }

}
