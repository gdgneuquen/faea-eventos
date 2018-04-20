import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard } from '../../services/authentication.guard';
import { User } from '@firebase/auth-types';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private fbauth: FirebaseauthService,
    private router: Router

  ) { }
  isAuthenticated: boolean;

  user: User;

  ngOnInit() {
    //Obtiene Usuario de Auth y lo agrega al Header
    this.fbauth.getUser().subscribe(user => {
      this.user = user
    })
  }
  
  //LogOut Usuario
  logout() {
    this.fbauth.logOut();
    this.router.navigate(['']);
  }

}
