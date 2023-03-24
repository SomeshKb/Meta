import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceneService } from './service/scene.service';
import { HomeComponent } from './component/home/home.component';
import { FormsModule } from '@angular/forms';
import { SensorMappingComponent } from './component/sensor-mapping/sensor-mapping.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SensorMappingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [SceneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
