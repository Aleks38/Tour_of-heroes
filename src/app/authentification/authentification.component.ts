import { Component } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  constructor(private authService: AuthService) { }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }
}
