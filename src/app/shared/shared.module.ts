import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Componentes */
import { HeaderComponent } from './components/header/header.component';

/* Ambientes */
import { environment } from '../../environments/environment';

/* Modulos */
import { MaterialModule } from '../material/material.module';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

/* Servicios */
import { FirebaseauthService } from './services/firebaseauth.service';
import { AuthenticationGuard } from './services/authentication.guard';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'Sattled Accounts'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
  ],
  providers:[FirebaseauthService,AuthenticationGuard],
  exports:[HeaderComponent],
  declarations: [HeaderComponent, LoginComponent]
})
export class SharedModule { }
