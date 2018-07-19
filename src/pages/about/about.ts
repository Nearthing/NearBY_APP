import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ApiProvider } from '../../providers/api/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private member: FormGroup;
  public user :any;
  submitAttempt: boolean = false;
  public _login : boolean = false;
  public SginupPage = "SginupPage"
  constructor(public navCtrl: NavController, 
    public loadingCtrl:LoadingController,
    public db:DatabaseProvider,
    public api:ApiProvider,
    private formbuilder: FormBuilder,
    public alertCtrl:AlertController,
    
    public navParams: NavParams) 
    {  
      this.validate();
       if(sessionStorage.getItem('login') == 'true'){
        this._login = true;
        this.login_auto();
      } else {
        console.log('khong lay duoc sesstion jwt')
      }
      if(this.navParams.get('user') != null) {
        console.log(this.user = this.navParams.get('user'));
        this.user = this.navParams.get('user');
        this.login(true)
        
      }
    }//----->constructor

    ionViewDidLoad() {
    }//---->ionViewDidLoad

  validate()
  {
    this.member = this.formbuilder.group({
      phone: ['', Validators.compose([Validators.minLength(10), 
            Validators.maxLength(12),Validators.required])],
      password: [ '', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }//---->validate

  public async login(sginUP = false)
  { 
    this.submitAttempt = true;
    let member  = this.member.value
    if(sginUP) {
       member = this.user
    }
    console.log('login member:',member)
    // chayj loading de check login
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img class="loading" src="assets/icon/slack_load.gif" />
      </div>`,
    cssClass :"css_loading"
    })
   
    loading.present();
    // gui yeu cau kiem tra account
      this.api.callApi(`http://${this.api.linkAIP}/sginIn_nember.php`,
       "post", "phonenumber=" +member.phone + "&password=" +member.password )
       .subscribe((res) => {
              if (res == 0) {
                loading.dismiss()
                setTimeout(()=>{
                  this.alertCtrl.create({
                      message: 'Sai tài khoản hoặc mật khẩu!',
                      buttons: [{ text: 'OK',}]
                    }).present();
                },500)
                return;
              }
          this.user = res;
          sessionStorage.setItem('login','true');
          setTimeout(()=>{
            loading.dismiss();
            this._login = true
          },1000);
          
          sessionStorage.setItem("id_member",res.id);
          sessionStorage.setItem('user_token',res.jwt)
          this.db.putUser(res.id,res.jwt);

        }, (err) => {
          console.log('login error',err)
         })
  }//---->login
  
  //------ tu dong dang nhap
  public login_auto()
  {
    this.api.callApi_JWT(`http://${this.api.linkAIP}/sginIn_by_JWT.php`,
    "post").subscribe((data)=>{
      if(data == 0) {
        this.db.Delete("DELETE FROM Account");
        this._login = false;
        
        this.ionViewDidLoad();
        return;
      }
      sessionStorage.setItem("id_member",data.id);
      this.user = data;
    })
  }//---->login_auto

  public logout()
  {
    var load_lout = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img class="loading" src="assets/icon/slack_load.gif" />
      </div>`,
    cssClass :"css_loading"
    })
    sessionStorage.setItem('login','false');
    load_lout.present();
    setTimeout(()=>{
      this.user = null;
      this._login = false;
      load_lout.dismiss()
      this.db.Delete("DELETE FROM Account");
       this.ionViewDidLoad();
    },1000)
    
  }//--->logout

}
