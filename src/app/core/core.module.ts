import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Modulos */
import { CoreRoutingModule } from './core.router';
import { MaterialModule } from '../material/material.module';

/* Componentes */
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { FirebasedbService } from './services/firebasedb.service';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'Sattled Accounts'),
    AngularFireDatabaseModule,
  ],
  exports: [
  ],
  providers: [FirebasedbService],
  declarations: [HomeComponent]
})
export class CoreModule { }
