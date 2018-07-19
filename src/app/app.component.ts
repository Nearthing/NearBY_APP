import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { TabsPage } from '../pages/tabs/tabs';
import { ApiProvider } from '../providers/api/api';
declare var google;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   rootPage:any = TabsPage;
  //rootPage:any = 'CreateshopPage';
  constructor(platform: Platform, statusBar: StatusBar,
    public db : DatabaseProvider, public api:ApiProvider,
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
      sessionStorage.setItem('login','false');
    } else {
       sessionStorage.setItem('user_token',member_sql);
       this.login_auto()
    }

  }
  public login_auto()
  {
    this.api.callApi_JWT(`http://${this.api.linkAIP}/sginIn_by_JWT.php`,
    "post").subscribe((data)=>{
      if(data == 0) {
        this.db.Delete("DELETE FROM Account");
        return;
      }
      
      sessionStorage.setItem('login','true');
      sessionStorage.setItem("id_member",data.id);
      sessionStorage.setItem("user_phone",data.phone);
      sessionStorage.setItem("user_name",data.name);
    })
  }

}

