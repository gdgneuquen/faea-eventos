import { Component, OnInit } from '@angular/core';
import { AuthenticationGuard } from '../../services/authentication.guard';
import { User } from '@firebase/auth-types';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private fbauth: FirebaseauthService,
  ) { }
  isAuthenticated: boolean;

  user: any;

  ngOnInit() {
    
    this.fbauth.getUser().subscribe(user => {
      this.user = user
    })

 }

}
