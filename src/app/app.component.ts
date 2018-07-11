import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   rootPage:any = TabsPage;
  //rootPage:any = 'AboutPage';
  constructor(platform: Platform, statusBar: StatusBar,
    public db : DatabaseProvider,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#12311f');
      statusBar.styleLightContent();
      splashScreen.hide();
      this.get_jwt();
      
    });
  }

  async get_jwt()
  {
    await this.db.createTbale() ; 
    let member_sql :any = await this.db.getUser()
    if(member_sql == false) {
      sessionStorage.setItem('not_login','false')
      
    } else {
       sessionStorage.setItem('not_login','true')
       sessionStorage.setItem('user_token',member_sql);
     
    }
    
  }

}

