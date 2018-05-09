import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard } from '../../services/authentication.guard';
import { User } from '@firebase/auth-types';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';

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
  fechaActual: string;
  horaActual: string;
  ngOnInit() {

    this.estableceFecha()
   

    //Obtiene Usuario de Auth y lo agrega al Header
    this.fbauth.getUser().subscribe(user => {
      this.user = user
    })
  }

  estableceFecha(){
    

    Observable.interval(1000).subscribe(x => {
      var fecha = new Date();
      this.fechaActual = fecha.toLocaleDateString('es-AR')
      this.horaActual = fecha.toLocaleTimeString('es-AR')
    });
  }
  
  //LogOut Usuario
  logout() {
    this.fbauth.logOut();
    this.router.navigate(['']);
  }

}
