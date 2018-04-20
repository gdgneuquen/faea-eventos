import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fbauth: FirebaseauthService,
  ) { }

  ngOnInit() {
  }

  iniciarSesionGoogle(){
    this.fbauth.googleLogin()
  }

}
