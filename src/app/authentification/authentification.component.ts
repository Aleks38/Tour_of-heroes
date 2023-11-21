import { Component } from '@angular/core';
import {AuthService, LoginData} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  constructor(private authService: AuthService, private router: Router) { }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }
}
