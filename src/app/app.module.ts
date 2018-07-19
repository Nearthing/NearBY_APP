import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ApiProvider } from '../providers/api/api';
import { HttpModule } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';

import { CustomFormsModule } from 'ng2-validation'
import { GpsProvider } from '../providers/gps/gps';
import { Camera } from '../../node_modules/@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    CustomFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      // Tabs config
      tabsHideOnSubPages: true,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    Geolocation,
    Diagnostic,
    SplashScreen,
    DatabaseProvider,
    
    LocationAccuracy,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    SQLite,
    GpsProvider,
    Camera
    
  ]
})
export class AppModule {}
