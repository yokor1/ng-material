import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared/shared.module';
import { AuthRoutingModule } from './/auth-routing.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule { }
