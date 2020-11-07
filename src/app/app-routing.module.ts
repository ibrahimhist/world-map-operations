import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignOutSuccessComponent } from './pages/auth/sign-out-success/sign-out-success.component';
import { ContinentComponent } from './pages/master/continent/continent.component';
import { WorldMapOperationsComponent } from './pages/master/world-map-operations/world-map-operations.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'world-map-operations',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-out-success',
    component: SignOutSuccessComponent,
  },
  {
    path: 'world-map-operations',
    component: WorldMapOperationsComponent,
  },
  {
    path: 'continent/:id',
    component: ContinentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
