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
import { MethoProvider } from '../providers/metho/metho';
import { TabsPage } from '../pages/tabs/tabs';
@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
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
    LocationAccuracy,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    MethoProvider
    
  ]
})
export class AppModule {}
