import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  returnUrl: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.authService.clearStorage();
  }

  ngOnInit(): void {}

  signInWithGoogle(): void {
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.authService.signInWithGoogle(returnUrl);
  }
}
