import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
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
