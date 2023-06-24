import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SpCreatorHomeComponent } from '../sp-creator-home/sp-creator-home.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthIntInterceptor } from '../interceptor/auth-int.interceptor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxDefaultOptions, MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SpCreatorHomeComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule,
    MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, BrowserAnimationsModule,
    MatButtonModule, MatMenuModule, MatCheckboxModule, MatTableModule, MatDialogModule,
    MatRadioModule, MatSelectModule, MatIconModule, MatToolbarModule, MatTabsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntInterceptor, multi: true },
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'check' } as MatCheckboxDefaultOptions }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
