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
  public not_login : boolean = true;
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
       if(sessionStorage.getItem('not_login') == 'true'){
        this.not_login = false;
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
      spinner: 'bubbles',
      content: `Đang đăng nhập ...`,
    });
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
          loading.dismiss();
          this.not_login = false
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
        this.not_login = true;
        this.ionViewDidLoad();
        return;
      }
     
      this.user = data;
        // console.log('login_auto thanh cong',data);
        // console.log('login_auto this.user-->',this.user);
    })
  }//---->login_auto

  public logout()
  {
    this.user = null;
    this.not_login = true;
    this.db.Delete("DELETE FROM Account");
    this.ionViewDidLoad();
  }//--->logout

}
