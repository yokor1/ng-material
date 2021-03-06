import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    }).then(result => {
      this.isLoading = false;
    })
    .catch(
      result => {
        this.isLoading = false;
      }
    );
  }

}
