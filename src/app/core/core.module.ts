import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core.router';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule
  ],
  exports: [
  ],
  declarations: [HomeComponent]
})
export class CoreModule { }
