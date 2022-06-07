import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { ModalComponent } from './modal/modal.component';
import {HttpClientModule} from "@angular/common/http";
import {CardComponent} from "./card/card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CarsListComponent,
    ModalComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
