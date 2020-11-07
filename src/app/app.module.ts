import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WorldMapOperationsComponent } from './pages/master/world-map-operations/world-map-operations.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { ContinentComponent } from './pages/master/continent/continent.component';
import { SignOutSuccessComponent } from './pages/auth/sign-out-success/sign-out-success.component';

import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapOperationsComponent,
    SignInComponent,
    ContinentComponent,
    SignOutSuccessComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LeafletModule,
    ButtonModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
