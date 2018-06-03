import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() closeSidenave = new EventEmitter<void>();
  isAuth = false;
  authSbscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSbscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): void {
    this.authSbscription.unsubscribe();
  }

  onClose() {
    this.closeSidenave.emit();
  }

  logout() {
    this.authService.logout();
  }

}
