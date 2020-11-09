import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignOutSuccessComponent } from './pages/auth/sign-out-success/sign-out-success.component';
import { ContinentComponent } from './pages/master/continent/continent.component';
import { WorldMapOperationsComponent } from './pages/master/world-map-operations/world-map-operations.component';
import { IsSignedInGuard } from './shared/guards/is-signed-in.guard';

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
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'continent/:id',
    component: ContinentComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: '**',
    redirectTo: 'world-map-operations',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
