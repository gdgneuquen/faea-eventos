import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Modulos */
import { CoreRoutingModule } from './core.router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

/* Componentes */
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { FirebasedbService } from './services/firebasedb.service';
import {FilterPipe} from './home/pipes'


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'Sattled Accounts'),
    AngularFireDatabaseModule,
    FormsModule
  ],
  exports: [
  ],
  providers: [FirebasedbService],
  declarations: [HomeComponent,FilterPipe]
})
export class CoreModule { }
