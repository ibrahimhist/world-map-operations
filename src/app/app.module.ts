import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { WorldMapOperationsComponent } from './pages/master/world-map-operations/world-map-operations.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { ContinentComponent } from './pages/master/continent/continent.component';

import { AuthService } from './shared/services/auth.service';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

import { GoogleLoginProvider } from 'angularx-social-login';
import { SignOutSuccessComponent } from './pages/auth/sign-out-success/sign-out-success.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ContinentsCardComponent } from './pages/master/world-map-operations/relateds/continents-card/continents-card.component';
import { WorldMapCardComponent } from './pages/master/world-map-operations/relateds/world-map-card/world-map-card.component';
import { AddNoteDialogComponent } from './shared/components/add-note-dialog/add-note-dialog.component';
import { WorldMapOperationsService } from './shared/services/world-map-operations.service';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapOperationsComponent,
    SignInComponent,
    ContinentComponent,
    SignOutSuccessComponent,
    HeaderComponent,
    ContinentsCardComponent,
    WorldMapCardComponent,
    AddNoteDialogComponent,
  ],
  entryComponents: [AddNoteDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    LeafletModule,
    SocialLoginModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    AutoCompleteModule,
    DialogModule,
    InputTextareaModule,
    DynamicDialogModule,
  ],
  providers: [
    AuthService,
    DialogService,
    WorldMapOperationsService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
