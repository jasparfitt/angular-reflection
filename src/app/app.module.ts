import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent} from './side-menu/side-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LineDetailsComponent } from './line-details/line-details.component';
import { LinePageComponent } from './line-page/line-page.component';
import { MainMapComponent } from './main-map/main-map.component';
import { HeaderComponent } from './header/header.component';
import { StationPageComponent } from './station-page/station-page.component';
import { StationMenuComponent } from './station-menu/station-menu.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ArrivalsComponent } from './arrivals/arrivals.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HomePageComponent,
    LineDetailsComponent,
    LinePageComponent,
    MainMapComponent,
    HeaderComponent,
    StationPageComponent,
    StationMenuComponent,
    TimetableComponent,
    ArrivalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
