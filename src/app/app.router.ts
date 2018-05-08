import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './shared/services/authentication.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { CoreModule } from './core/core.module';


const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/core/core.module#CoreModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }