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

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
    this.fbauth.getUser().subscribe(user => { 
      if (user == undefined) {
        this.isAuthenticated = false;
        this.router.navigate(['/']);
      } else {
        this.isAuthenticated = true;
        this.router.navigate(['/home']);
      }
    })
    
    return this.isAuthenticated;

  }
}
