import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseauthService } from './firebaseauth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private fbauth: FirebaseauthService,
    private router: Router
  ) { }

  isAuthenticated: boolean;
  user: any;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.fbauth.getUser().subscribe(user => { 
      this.user = user
      if (this.user == undefined) {
        this.isAuthenticated = false;
      } else {
        this.isAuthenticated = true;
        this.router.navigate(['']);
      }
    })
    return this.isAuthenticated;

  }
}
