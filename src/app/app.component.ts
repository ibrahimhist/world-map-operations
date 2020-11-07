import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'world-map-operations';

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService
  ) {
    this.authService.trackAuthState();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
